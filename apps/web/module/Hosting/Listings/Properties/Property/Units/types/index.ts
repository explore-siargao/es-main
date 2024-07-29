export interface IBed {
    name: string;
    qty: number;
  }
  
  export interface IBedroom {
    bedRoomName: string;
    beds: IBed[];
  }