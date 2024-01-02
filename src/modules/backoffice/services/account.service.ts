import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../models/user.model';
import { Customer } from '../models/customer.model';

@Injectable()
export class AccountService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Customer') private readonly customerModel: Model<Customer>,
    ) { }

    async create(data: User): Promise<User> {
        const user = new this.userModel(data);
        return await user.save();
    }

    async update(username: string, data: any): Promise<any> {
        return await this.userModel.findOneAndUpdate({ username }, data);
    }

    // Método apenas para fins didaticos e testes
    // async findOneByUsername(username) {
    //     return new User(username, '123456789', true, ['user']);
    // }

    async authenticate(username: string, password: string): Promise<Customer> {
        return await this.customerModel
            .findOne(
                {
                    'user.username': username,
                    'user.password': password
                }
            )
            .populate('user', '-password')
            .exec();
    }
}