import { PaymentInfo } from "./paymentInfo";
import { Rental } from "./rental";

export interface PaymentQuery{
    paymentInfo:PaymentInfo;
    rental:Rental;
}