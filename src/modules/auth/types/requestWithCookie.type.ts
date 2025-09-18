import { Request } from 'express';

export interface RequestWithCookies extends Request {
  cookies: {
    jwt?: string;
    [key: string]: string | undefined;
  };
}
