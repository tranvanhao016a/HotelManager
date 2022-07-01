import { KindRoom } from "./kindroom.model";
import { RoomVoucher } from "./roomvoucher.model";

export interface Room{
    idRoom : string,
    kindRoom : KindRoom,
    status : string,
    roomVoucher : RoomVoucher,

}