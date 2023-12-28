import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "../models/customer.model";

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    //Para criar um novo cliente
    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
    }
}