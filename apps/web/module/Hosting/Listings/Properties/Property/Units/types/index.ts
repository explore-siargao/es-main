export interface IBed {
  name: string
  qty: number
  _id?: string
}

export interface IBedroom {
  roomName?: string
  beds: IBed[]
}

export interface IBedroom {
  beds: IBed[]
}


