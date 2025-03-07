import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [DbModule, CategoryModule],
})
export class AppModule {}
