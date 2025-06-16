import { User } from '../types/user.types';
import { PaginationOptions, PaginationResult } from '../types/pagination.types';
import { paginateArray } from '../utils/pagination.util';
import { usersData } from '../data/users.data';

export class UserService {
  private users: User[] = usersData;

  getAllUsers(): User[] {
    return this.users;
  }

  getPaginatedUsers(options: PaginationOptions): PaginationResult<User> {
    return paginateArray(this.users, options);
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}

export const userService = new UserService();