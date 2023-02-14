import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import {resolve} from 'path'
import path from 'path'
import fs from 'fs'
import fsExtra from 'fs-extra'
import dts from 'vite-plugin-dts'
import viteCompression from 'vite-plugin-compression'
// 打包人口文件夹
const entryDir = path.resolve(__dirname, '../packages')
// 出口文件夹
const outDir = path.resolve(__dirname, '../dist')
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})

// rollup配置
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}
// 全量打包构建
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'index.ts'),
        name: 'o_o-ele-component',
        fileName: 'o_o-ele-component',
        formats: ['es', 'umd']
      }
    }
  })
}
// 打包成库
const buildLib = async () => {
  await buildAll()

  // 获取组件名称
  const components = fs.readdirSync(entryDir).filter(name => {
    const componentDir = path.resolve(entryDir, name)
    const isDir = fs.lstatSync(componentDir).isDirectory()
    //isDir && fs.readFileSync(componentDir).includes('index.ts')
    return isDir
  })
  console.log(components)
  // 循环构建
  for (const name of components) {
    await buildSingle(name)
    createPackageJson(name)
  }
}
// 每个组件生成package.json
const createPackageJson = name => {
  const fileStr = `
  {
    "name": "${name}",
    "main": "index.umd.js",
    "module":"index.es.js",
    "style": "styles.css"
  }
  `
  // 输出
  fsExtra.outputFile(
    path.resolve(outDir, `${name}/package.json`),
    fileStr,
    'utf-8'
  )
}
buildLib()
export default defineConfig({
  plugins: [vue(), vueJsx(),dts({include:'./lib'}),viteCompression({
    verbose: true,
    disable: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz',
  }),],
  
  server: {
    port: 8080
  },
  build:{
    lib:{
      entry:resolve(__dirname, './packages/index.ts'),
      name: 'wElePLusComponLib',
        fileName: 'wElePLusComponLib',
        formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue','vue-router'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
