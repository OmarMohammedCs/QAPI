import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionService {

  constructor(
    @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
  ) { }

  async create(createQuestionDto: CreateQuestionDto) {
    const { text, type, options, correctAnswer, createdBy } = createQuestionDto;
    const question = new Question();
    question.text = text;
    question.type = type;
    question.options = JSON.stringify(options);
    question.correctAnswer = correctAnswer;
    question.createdBy = createdBy;
    const saveQuestion = await this.questionRepository.save(question)
    return saveQuestion;
  }

  async findAll() {
    const questions = await this.questionRepository.find();
    if (questions.length === 0) return [];
    
    return questions.map(question => ({
      ...question,
      options: question.options ? JSON.parse(question.options) : []
    }));
  }

  async findOne(id: number) {
    const question = await this.questionRepository.findOne({ where: { id } });
    if (!question) return null;
    
    return {
      ...question,
      options: question.options ? JSON.parse(question.options) : []
    };
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const { options, ...rest } = updateQuestionDto;
    const updateData = {
      ...rest,
      options: options ? JSON.stringify(options) : undefined
    };
    
    await this.questionRepository.update({ id }, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.questionRepository.delete(id);

    if (result.affected === 0) {
        throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return [];
}
}
