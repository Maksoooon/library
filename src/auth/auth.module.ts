import { Module, OnModuleInit } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './auth.entity';
import { JwtStrategy } from './auth.strategy';

// import * as admins from '../../seeds/adminSeed.json';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user'}),
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_KEY,
        signOptions: { expiresIn: process.env.JWT_EXPIRE}  
      })
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})

export class AuthModule {}