import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity("user")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column({ type: 'varchar'})
    first_name: string;

    @Column({ type: 'varchar'})
    second_name: string;

    @Column({ type: 'varchar'})
    last_name: string;

    @Column({ type: 'int'})
    student_number: number;

    @Column({ type: 'varchar'})
    password: string;

    @Column({ enum: ['student', 'teacher'], default: 'student'})
    user_type: string;

    private static checkPassword(password, userPassword) {
        return bcrypt.compareSync(password, userPassword);
    }

    static async isUserExist(student_number) {
        return this.createQueryBuilder("user")
        .where("user.student_number = :student_number", { student_number })
        .getOne();
    }

    static async getUserById(userId) {
        return this.createQueryBuilder("user")
        .where("user.userId = :userId", { userId })
        .getOne();
    }

    static generatePasswordHash(password: string) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    static async loginProccess(student_number, password) {
        const user = await this.createQueryBuilder("user")
        .where("user.student_number = :student_number", {student_number})
        .getOne();
        
        if (!user) return false;

        const isPasswordValid = await this.checkPassword(password, user.password || null);

        if(!isPasswordValid) return false;

        return user;
    }
}