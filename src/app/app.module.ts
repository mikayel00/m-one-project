import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configs from './config';
import { AuthModule } from '../modules/auth/auth.module';
import { UsersModule } from '../modules/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../modules/users/models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configs],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('POSTGRES.HOST'),
        port: configService.get('POSTGRES.PORT'),
        username: configService.get('POSTGRES.USER'),
        password: configService.get('POSTGRES.PASSWORD'),
        database: configService.get('POSTGRES.NAME'),
        synchronize: true,
        autoLoadModels: true,
        models: [User],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
