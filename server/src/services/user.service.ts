import { User } from '../types/user.types';
import { PaginationOptions, PaginationResult } from '../types/pagination.types';
import { paginateArray } from '../utils/pagination.util';
import { usersData } from '../data/users.data';

export class UserService {
  private users: User[] = usersData;

  /**
   * Retrieves all users without pagination
   * @returns Array of all users
   */
  getAllUsers(): User[] {
    return this.users;
  }

  /**
   * Retrieves users with pagination and optional sorting
   * @param options - Pagination options including page, size, and sort parameters
   * @returns Paginated result containing users and pagination metadata
   */
  getPaginatedUsers(options: PaginationOptions): PaginationResult<User> {
    return paginateArray(this.users, options);
  }

  /**
   * Finds a user by their unique identifier
   * @param id - The user's unique identifier
   * @returns The user if found, undefined otherwise
   */
  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}

export const userService = new UserService();