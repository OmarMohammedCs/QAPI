import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { CategoryModule } from './category/category.module';
import { QuestionModule } from './question/question.module';

@Module({
  imports: [DbModule, CategoryModule, QuestionModule],
})
export class AppModule {}
