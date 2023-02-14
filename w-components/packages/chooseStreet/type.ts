export interface areaArrType {
  code: string
  name: string
  children?: areaArrType[]
}
export interface emitArrType {
  code: string
  name: string
}
export interface childArrType {
  province: emitArrType
  city: emitArrType
  area: emitArrType
}
export interface childStreetArrType extends childArrType {
  street: emitArrType
}