import { Injectable, ConflictException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username, password }).exec();
    if (user) {
      return { message: 'Login successful', user };
    } else {
      return { message: 'Invalid credentials' };
    }
  }

  async register(createUserDto: CreateUserDto) {
    // Check if a user with the same username already exists
    const existingUser = await this.userModel.findOne({ username: createUserDto.username }).exec();
    if (existingUser) {
      throw new ConflictException('A user with this username already exists');
    }

    const newUser = new this.userModel(createUserDto);
    await newUser.save();
    return { message: 'User registered', user: newUser };
  }
}
