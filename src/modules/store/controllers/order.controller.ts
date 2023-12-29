import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";

import { OrderService } from "../services/order.service";
import { OrderItemService } from "../services/order-item.service";
import { ProductService } from "../services/product.service";

import { ResultDto } from "src/shared/dtos/result.dto";
import { OrderItemDto } from "../dtos/order-item.dto";

import { Order } from "../entities/order.entity";
import { OrderItem } from "../entities/order-item.entity";

@Controller('v1/orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService,
        private readonly orderItemService: OrderItemService,
        private readonly productService: ProductService
    ) { }

    @Get(':order')
    async get(@Param('order') order: string) {
        try {
            const orders = await this.orderService.getByNumber(order);
            return new ResultDto(null, true, orders, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível obter os pedidos', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':customer') // :customer se refere ao 'document' que é o CPF do cliente
    async getByCustomer(@Param('customer') customer: string) {
        try {
            const orders = await this.orderService.getByCustomer(customer);
            return new ResultDto(null, true, orders, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível obter os pedidos', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async post(@Body() model: OrderItemDto[]) {
        try {
            let order = new Order();
            order.customer = '12345678901'; // Virá do Token (JWT)
            order.date = new Date();
            order.number = '1B2D3F5';
            order.items = [];
            await this.orderService.post(order);

            for (const item of model) {
                let product = await this.productService.getById(item.product);

                // TODO: Refatorar essas regras de negócio em outro local e de forma escalável
                // - Adicionar filas;
                // - Adicionar validações e rollbacks
                
                if(product.quantityOnHand > 0 && product.quantityOnHand < item.quantity) {
                    return new ResultDto('Não foi possível criar o seu pedido!', false, null, `Há apenas ${product.quantityOnHand} unidades do produto '${product.title}' em estoque`);
                }

                if(product.quantityOnHand <= 0) {
                    return new ResultDto('Não foi possível criar o seu pedido!', false, null, `Não temos o produto '${product.title}' em estoque`);
                }

                let orderItem = new OrderItem();
                orderItem.order = order;
                orderItem.product = product;
                orderItem.price = product.price;
                orderItem.quantity = item.quantity;
                await this.orderItemService.post(orderItem);
            }

            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível criar o seu pedido', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}