import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  users: User[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  /**
   * Creates a new user to database
   * @param name
   * @param username
   * @param email
   * @param address
   * @param phone
   * @returns Promise<{ message: string; user: User }
   */
  async createUser(
    name: string,
    username: string,
    email: string,
    address: string,
    phone: number,
  ): Promise<{ message: string; user: User }> {
    const user = new this.userModel({
      name,
      username,
      email,
      address,
      phone,
    });

    const result = await user.save();
    return { message: 'User created successfully..', user: result };
  }

  /**
   *  Fetching all the users from db
   * @returns Promise<User[]>
   */
  async getUsers(): Promise<User[]> {
    const result = await this.userModel.find().exec();
    return result;
  }

  /**
   * Get user by id
   * @param userId
   * @returns Promise<User>
   */
  async getUser(userId: string): Promise<User> {
    const user = await this.findUser(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  /**
   * Update give data by user Id
   * @param userId
   * @param name
   * @param username
   * @param email
   * @param address
   * @param phone
   * @returns {}
   */
  async updateUser(
    userId: string,
    name: string,
    username: string,
    email: string,
    address: string,
    phone: number,
  ) {
    const updatedUser = await this.findUser(userId);

    if (!updatedUser) {
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
    updatedUser.save();
    return { message: 'user updated successfully...' };
  }

  /**
   * Deleting user by userId
   * @param userId
   * @returns
   */
  async deleteUser(userId: string) {
    const result = await this.userModel
      .findByIdAndDelete({ _id: userId })
      .exec();

    if (result === null) {
      throw new NotFoundException('user not found');
    } else {
      return { message: 'user deleted successfully...' };
    }
  }

  private async findUser(userId: string) {
    let user;
    try {
      user = await this.userModel.findById({ _id: userId }).exec();
    } catch (error) {
      throw new NotFoundException('could not find the user.');
    }
    if (!user) {
      throw new NotFoundException('could not find the user.');
    }

    return user as User;
  }
}
