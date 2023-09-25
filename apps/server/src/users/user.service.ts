import { Injectable } from '@nestjs/common';
import { kil } from '@/schema/db';
import { users } from '@/schema/user.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  async getUser(id: string) {
    const [user] = await kil.select().from(users).where(eq(users.id, id));
    return user;
  }
}
