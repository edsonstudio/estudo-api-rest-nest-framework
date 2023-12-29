import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ // Para resolver as injeções de dependencias no Repository do TypeOrm
        Product,
        Order,
        OrderItem
    ])],
    controllers: [
        ProductController
    ],
    providers: [
        ProductService
    ]
})
export class StoreModule {}
