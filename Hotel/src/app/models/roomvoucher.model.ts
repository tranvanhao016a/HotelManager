import { Customer } from "./customer.model";
import { Room } from "./room.model";
import { Service } from "./service.model";
import { Staff } from "./staff.model";

export interface RoomVoucher{
    idRoomVoucher:string,
    bookingDate:Date,
    payDay:Date,
    numCus:Number,
    services:Service[],
    total:Number,
    staff:Staff,
    room:Room,
    customer:Customer,
}