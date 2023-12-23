import type { Request, Response } from 'express';

export interface AppRequestContext {
  req: Request;
  res: Response;
}
