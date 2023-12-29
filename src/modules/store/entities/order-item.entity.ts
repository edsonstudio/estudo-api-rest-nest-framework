import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity({
    name: 'tb_order_item'
})
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (o) => o.items)
    order: Order;

    @ManyToOne(() => Product, (p) => p)
    product: Product;

    @Column('decimal')
    price: number;

    @Column('decimal')
    quantity: number;
}