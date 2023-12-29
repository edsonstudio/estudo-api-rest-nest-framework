import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItemService } from './services/order-item.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';

import { OrderController } from './controllers/order.controller';
import { ProductController } from './controllers/product.controller';

import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ // Para resolver as injeções de dependencias no Repository do TypeOrm
        Order,
        OrderItem,
        Product
    ])],
    controllers: [
        OrderController,
        ProductController
    ],
    providers: [
        OrderService,
        OrderItemService,
        ProductService
    ]
})
export class StoreModule { }
