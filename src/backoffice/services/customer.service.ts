import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Customer } from "../models/customer.model";
import { Address } from "../models/address.model";
import { Pet } from "../models/pet.model";

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

    async create(data: Customer): Promise<Customer> {
        const customer = new this.model(data);
        return await customer.save();
    }

    async addBillingAddress(document: string, data: Address): Promise<Customer> {
        const options = { upsert: true }; // Serve para caso não exista o endereço no cliente ele nao fique tentando atualizar, mas sim o crie.

        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                billingAddress: data
            }
        }, options);
    }

    async addShippingAddress(document: string, data: Address): Promise<Customer> {
        const options = { upsert: true }; // Serve para caso não exista o endereço no cliente ele nao fique tentando atualizar, mas sim o crie.

        return await this.model.findOneAndUpdate({ document }, {
            $set: {
                shippingAddress: data
            }
        }, options);
    }

    async createPet(document: string, data: Pet): Promise<Customer> {
        const options = { upsert: true, new: true };
        return await this.model.findOneAndUpdate({document},{
            $push: {
                pets: data
            }
        }, options);
    }

    async updatePet(document: string, id: string, data: Pet): Promise<Customer> {
        return await this.model.findOneAndUpdate({document, 'pets._id':id}, {
            $set: {
                'pets.$': data
            }
        });
    }
}