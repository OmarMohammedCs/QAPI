import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>){}
  async create(createCategoryDto: CreateCategoryDto) {
   try {
    const { name, description } = createCategoryDto;
  
    // Check if category already exists
    const existingCategory = await this.categoryRepository.findOne({ where: { name } });
    if (existingCategory) {
      throw new Error('Category already exists');
    }
  
    // Create and save new category
    const category = this.categoryRepository.create({ name, description });
    return await this.categoryRepository.save(category);
   } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Failed to create category');
   }
  }
  

  async findAll() {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      throw new Error('Failed to retrieve categories');
    }
  }

  async findOne(id: number) {
    try {
      return await this.categoryRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error('Failed to retrieve category');
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const { name, description } = updateCategoryDto;
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        throw new Error('Category not found');
      }
      category.name = name || category.name;
      category.description = description || category.description;
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new Error('Failed to update category');
    }
  }

  async remove(id: number) {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        throw new Error('Category not found');
      }
      return await this.categoryRepository.remove(category);
    } catch (error) {
      throw new Error('Failed to delete category');
    }
  }
}
