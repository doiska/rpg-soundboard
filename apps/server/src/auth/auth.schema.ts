import { Socket } from 'socket.io';
import { z } from 'zod';

export const sessionSchema = z.object({
  name: z.string(),
  email: z.string(),
});

export interface AuthenticatedSocket extends Socket {
  jwt: {
    name: string;
    email: string;
  };
}
