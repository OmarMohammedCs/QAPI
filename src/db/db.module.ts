import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Question } from 'src/question/entities/question.entity';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'db',
        entities:[Category,Question],
        synchronize: true,
    })]
})
export class DbModule {}
