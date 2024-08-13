export interface IBed {
  name: string
  qty: number
}

export interface IBedroom {
  roomName: string
  beds: IBed[]
}
