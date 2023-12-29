import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'tb_product'
})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 80 })
    title: string;

    @Column('text')
    description: string;

    @Column('decimal')
    price: number;

    @Column('decimal')
    quantityOnHand: number;
}