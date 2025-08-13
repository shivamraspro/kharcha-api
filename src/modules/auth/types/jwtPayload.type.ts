import { AuthenticatedUser } from 'src/modules/auth/types/authenticated-user.type';

export interface JwtPayload {
  user: AuthenticatedUser;
}
