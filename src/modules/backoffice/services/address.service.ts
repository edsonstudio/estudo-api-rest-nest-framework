import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "../models/customer.model";
import { Address } from "../models/address.model";
import { AddressType } from "../enums/address-type.enum";

@Injectable()
export class AddressService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    async create(document: string, data: Address, type: AddressType): Promise<Customer> {
        const options = { upsert: true }; // Serve para caso não exista o endereço no cliente ele nao fique tentando atualizar, mas sim o crie.

        if(type == AddressType.Billing) {
            return await this.model.findOneAndUpdate({ document }, {
                $set: {
                    billingAddress: data
                }
            }, options);
        }else{
            return await this.model.findOneAndUpdate({ document }, {
                $set: {
                    shippingAddress: data
                }
            }, options);
        }
    }
}