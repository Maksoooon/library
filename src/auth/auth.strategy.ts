import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from './auth.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_KEY,
        ignoreExpiration: false,
    });
  }

  public async validate(payload) {
    const user = await User.findOne({
        where: {
            userId: payload.id
        }
    });

    return user;
  }
}
