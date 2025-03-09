import { IsArray, IsIn, IsOptional, IsString } from "class-validator";

export class CreateQuestionDto {
    // question 
    @IsString()
    text: string;

    // question type
    @IsString()
    @IsIn(["choose", "True/False", "text"])
    type: string;

    // question options
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    options?: string[];

    // question correct answer
    @IsString()
    @IsOptional()
    correctAnswer: string;

    // question created by
    @IsString()
    createdBy: string;
}
