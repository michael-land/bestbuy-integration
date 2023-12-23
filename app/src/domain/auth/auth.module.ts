import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver.js';
import { AuthService } from './auth.service.js';
import { AuthStrategy } from './auth.strategy.js';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configSerivce: ConfigService) => ({
        secret: configSerivce.get('JWT_SECRET') || '',
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  providers: [AuthStrategy, AuthResolver, AuthService],
})
export class AuthModule {}
