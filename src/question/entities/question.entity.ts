import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    text: string;  // question text

    @Column({ type: 'varchar', length: 50, nullable: false })
    type: string; // question type

    // Example: JSON.stringify(["choose", "True/False", "text"]);
    @Column({ type: 'text', nullable: true })
    options: string; // question options

    @Column({ type: 'varchar', length: 255, nullable: true })
    correctAnswer: string; // correct answer

    @Column({ type: 'varchar', length: 255, nullable: false })
    createdBy: string; // created by

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
