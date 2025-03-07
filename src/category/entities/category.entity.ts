import { Column, Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar',length:255,unique:true,nullable:false})
    name: string;

    @Column({type:'varchar',length:255,nullable:true})
    description: string;

    // @OneToMany(() => Product, (product) => product.category, { cascade: true })
    // products: Product[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
