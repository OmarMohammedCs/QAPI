import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db',
        entities:[Category],
        synchronize: true,
    })]
})
export class DbModule {}
