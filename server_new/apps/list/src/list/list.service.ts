import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class ListService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findAll() {
    return this.todoModel.find().exec();
  }

  async create(createTodoDto: CreateTodoDto) {
    const newTodo = new this.todoModel(createTodoDto);
    return newTodo.save();
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoModel.findById(id);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    todo.checked = updateTodoDto.checked; // assuming 'checked' is the only field in UpdateTodoDto
    await todo.save();
    return todo;
  }

  async delete(id: string) {
    const result = await this.todoModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Todo not found');
    }
    return { message: 'Todo deleted successfully' };
  }
}
