export interface I_Bed {
    name: string;
    qty: number;
  }
  
  export interface I_Bedroom {
    bedRoomName: string;
    beds: I_Bed[];
  }