import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// export function LocalAuthGuard() {
//   return UseGuards(new LocalAuthGuardClass());
// }

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
