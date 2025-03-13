import { Module } from '@nestjs/common';
import { TodoController } from './app.controller';
import { AppService } from './app.service';
import { StaticModule } from './static.module';

@Module({
  imports: [
    StaticModule
  ],
  controllers: [TodoController],
  providers: [AppService],
})
export class AppModule {}
