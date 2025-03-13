import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
@Controller('api')
export class TodoController {
  @Get('todos')
  getTodos() {
    return [{ id: 1, title: 'Learn NestJS' }, { id: 2, title: 'Build a TODO App' }];
  }
}