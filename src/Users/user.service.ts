import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  users: User[] = [];

  constructor() {}

  createUser(
    name: string,
    username: string,
    email: string,
    address: string,
    phone: number,
  ) {
    const user = new User(
      '' + Math.random(),
      name,
      username,
      email,
      address,
      phone,
    );
    this.users.push(user);
    return this.users;
  }

  getUsers() {
    return [...this.users];
  }

  getUser(userId: string) {
    const user = this.findUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  updateUser(
    userId: string,
    name: string,
    username: string,
    email: string,
    address: string,
    phone: number,
  ): { message: string } {
    const [user, index] = this.findUser(userId);
    const updatedUser = { ...user };
    if (!user) {
      throw new NotFoundException('user not found');
    } else {
      if (name) {
        updatedUser.name = name;
      }
      if (username) {
        updatedUser.username = username;
      }
      if (email) {
        updatedUser.email = email;
      }
      if (address) {
        updatedUser.address = address;
      }
      if (phone) {
        updatedUser.phone = phone;
      }
    }

    this.users[index] = updatedUser;
    return { message: 'user updated successfully...' };
  }

  deleteUser(userId: string) {
    const [_, index] = this.findUser(userId);
    this.users.splice(index, 1);
    return { message: 'user deleted successfully...' };
  }

  private findUser(userId: string): [User, number] {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    const user = this.users[userIndex];

    return [user, userIndex];
  }
}
