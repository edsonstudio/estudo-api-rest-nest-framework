import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItem } from "../entities/order-item.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderItemService {
    constructor(@InjectRepository(OrderItem) private readonly repository: Repository<OrderItem>) { }

    async post(item: OrderItem) {
        await this.repository.save(item);
    }
}