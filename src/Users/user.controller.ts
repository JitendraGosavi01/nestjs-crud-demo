import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(
    @Body('name') name: string,
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('address') address: string,
    @Body('phone') phone: number,
  ) {
    return this.userService.createUser(name, username, email, address, phone);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUser(@Param('id') userId: string) {
    return this.userService.getUser(userId);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') userId: string,
    @Body('name') name: string,
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('address') address: string,
    @Body('phone') phone: number,
  ) {
    return this.userService.updateUser(
      userId,
      name,
      username,
      email,
      address,
      phone,
    );
  }

  @Delete('/:id')
  deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
