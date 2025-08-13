import { BaseKhEntity } from 'src/common/entities/base-kh.entity';
import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';

@Entity('users')
export class User extends BaseKhEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;
}
