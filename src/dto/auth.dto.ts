import { Trim } from "class-sanitizer";

export class RegisterDto {
    public readonly first_name: string;

    @Trim()
    public readonly second_name: string;

    @Trim()
    public readonly last_name: string;

    @Trim()
    public readonly student_number: number;

    @Trim()
    public readonly password: string;

    @Trim()
    public readonly user_type: string;
}

export class LoginDto {
    public readonly student_number: number;
    public readonly password: string;
}