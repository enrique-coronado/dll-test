import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  test('should get all users', () => {
    const users = userService.getAllUsers();
    expect(users).toHaveLength(5);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
  });

  test('should get user by id', () => {
    const user = userService.getUserById(1);
    expect(user).toBeDefined();
    expect(user?.id).toBe(1);
    expect(user?.name).toBe('Mike');
  });
});