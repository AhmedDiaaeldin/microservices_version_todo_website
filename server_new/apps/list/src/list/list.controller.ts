import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller()
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('getList')
  getAllTodos() {
    return this.listService.findAll();
  }

  @Post('addTodo')
  addTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.listService.create(createTodoDto);
  }

  @Put('editTodo/:id')
  editTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.listService.update(id, updateTodoDto);
  }

  @Delete('deleteTodo/:id')
  deleteTodo(@Param('id') id: string) {
    return this.listService.delete(id);
  }
}
