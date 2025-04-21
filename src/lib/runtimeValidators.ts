import { z } from 'zod';

export const taskBodySchema = z.string().min(1, 'Task body cannot be empty');
