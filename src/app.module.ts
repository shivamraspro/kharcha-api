import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Library Modules
import { ConfigModule } from '@nestjs/config';
// Project Modules
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DbModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
