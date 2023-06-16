import { Address } from "./Address";

export type NewOrder = {
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    address: Address;
    deliveryTime: string;
    products: Product[];
}

type Product = {
    name: string;
    quantity: number;
    size?: string;
}