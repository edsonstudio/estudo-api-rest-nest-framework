import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "../models/customer.model";
import { QueryDto } from "../dtos/query.dto";
import { UpdateCustomerDto } from "../dtos/customer/update-customer.dto";

@Injectable()
export class CustomerService {
    constructor(@InjectModel('Customer') private readonly model: Model<Customer>) { }

    async findAll(): Promise<Customer[]> {
        // Versão com o ID, ideal para utilizar numa grid onde é necessario repassar o ID para o backend.
        return await this.model.find({}, 'name email document')
            // .sort('name') // Ordena pelo nome de forma crescente.
            .sort('-name') // Ordena pelo nome de forma decrescente.
            .exec();

        // Versão sem o ID.
        // return await this.model.find({}, 'name email document -_id').exec(); 
    }

    async find(document): Promise<Customer> {
        return await this.model
            .findOne({ document })
            .populate('user', 'username')
            .exec();
    }

    // Exemplo com paginação
    async query(model: QueryDto): Promise<Customer[]> {
        return await this.model
            .find(model.query, model.fields,
                {
                    skip: model.skip,
                    limit: model.take
                })
            .sort(model.sort)
            .exec();
    }

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
    }

    async update(document: string, data: UpdateCustomerDto): Promise<Customer> {
        return await this.model.findOneAndUpdate({ document }, data);
    }
}