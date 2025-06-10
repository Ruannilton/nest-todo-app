import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdentityTable } from './infrastructure/database/schemas/identity-table.table';
import { SignInUseCase } from './application/use-cases/signin.use-case';
import { SignUpUseCase } from './application/use-cases/signup.use-case';
import { IIdentityRepository } from './application/contracts/identity-repository.contract';
import { IdentityRepository } from './infrastructure/database/repositories/identity-repository.repository';
import { TasksModule } from '../tasks/tasks.module';
import { AuthController } from './presentation/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './service/passport.strategy';
import { JwtAuthGuard } from './service/jwt-guard.guard';
import { JwtPresenterService } from './service/jwt-presenter.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
    }),
    TypeOrmModule.forFeature([IdentityTable]),
    TasksModule,
  ],
  providers: [
    SignInUseCase,
    SignUpUseCase,
    {
      provide: IIdentityRepository,
      useClass: IdentityRepository,
    },
    JwtStrategy,
    JwtPresenterService,
    JwtAuthGuard,
  ],
  controllers: [AuthController],
  exports: [JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
