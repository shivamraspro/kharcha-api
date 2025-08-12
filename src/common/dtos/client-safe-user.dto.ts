import { Expose } from 'class-transformer';

export class ClientSafeUserDto {
  @Expose()
  uuid: string;

  @Expose()
  email: string;

  @Expose()
  name: string;
}
