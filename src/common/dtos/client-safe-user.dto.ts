import { Expose } from 'class-transformer';

export class ClientSafeUserDto {
  // These are the only properties we deem safe for the client
  @Expose()
  uuid: string;

  @Expose()
  email: string;

  @Expose()
  name: string;
}
