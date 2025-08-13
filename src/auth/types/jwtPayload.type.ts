import { AuthenticatedUser } from './authenticated-user.type';

export interface JwtPayload {
  user: AuthenticatedUser;
}
