import request from 'supertest';
import express from 'express';
import userRoutes from './user.route';

const app = express();
app.use('/api/users', userRoutes);

describe('GET /api/users', () => {
  test('should return all users without pagination', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);

    expect(response.body.data).toHaveLength(5);
    expect(response.body.paging.totalResults).toBe(5);
  });

  test('should return paginated results', async () => {
    const response = await request(app)
      .get('/api/users?size=2&page=1')
      .expect(200);

    expect(response.body.data).toHaveLength(2);
    expect(response.body.paging.totalResults).toBe(5);
    expect(response.body.paging.next).toContain('page=2');
  });

  test('should sort by name ascending', async () => {
    const response = await request(app)
      .get('/api/users?sort=name:asc')
      .expect(200);

    const names = response.body.data.map((user: any) => user.name);
    expect(names).toEqual(['Andrew', 'Jorn', 'Markus', 'Mike', 'Ori']);
  });

  test('should return 400 for invalid page size', async () => {
    const response = await request(app)
      .get('/api/users?size=0')
      .expect(400);

    expect(response.body.data).toHaveLength(0);
    expect(response.body.paging.totalResults).toBe(0);
  });
});