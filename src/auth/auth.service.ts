import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from './auth.entity';
import { RegisterDto } from 'src/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  public async register(body: RegisterDto) {
    const { first_name, second_name, last_name, student_number, user_type, password } = body;
    let user = await User.isUserExist(student_number);

    if(user) {
      throw new HttpException('Пользователь уже существует', HttpStatus.CONFLICT);
    }

    user = new User();

    user.first_name = first_name;
    user.second_name = second_name;
    user.last_name = last_name;
    user.student_number = student_number;
    user.password = await User.generatePasswordHash(password);
    user.user_type = user_type;
    const result = await User.save(user)
    const accessToken = await this.jwtService.sign({id: result.userId, role: result.user_type});
    delete result.password;
    return {
      user: result,
      accessToken
    }
  }

  public async login(body) {
    const user = await User.loginProccess(body.student_number, body.password);
    if(!user) {
      throw new HttpException('Введены неверные данные', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = await this.jwtService.sign({id: user.userId, user_type: user.user_type});

    return {
      user,
      accessToken
    };
  }

  public async jwtDecode(token) {
    const payload = this.jwtService.decode(token.slice(7));
    const user = await User.findOne({
      where: {
        userId: payload.id
      }
    })
    delete payload.iat;
    delete payload.exp;
    return {...payload};
  }
}
