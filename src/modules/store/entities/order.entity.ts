import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

@Entity({
    name: 'tb_order'
})
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 8 })
    number: string;

    @Column('datetime')
    date: Date;

    @Column({ length: 11 })
    customer: string;

    @OneToMany(() => OrderItem, (oi) => oi.order)
    items: OrderItem[];
}