export interface T_Bed {
    name: string;
    qty: number;
  }
  
  export interface T_Bedroom {
    bedRoomName: string;
    beds: T_Bed[];
  }