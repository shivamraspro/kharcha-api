/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CreateDateColumn,
  UpdateDateColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

export abstract class BaseKhEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @AfterInsert()
  logInsert() {
    console.log(
      `[INSERT] ${this.constructor.name} (ID: ${(this as any).id}) ->`,
      this,
    );
  }

  @AfterUpdate()
  logUpdate() {
    console.log(
      `[UPDATE] ${this.constructor.name} (ID: ${(this as any).id}) ->`,
      this,
    );
  }

  @AfterRemove()
  logRemove() {
    console.log(
      `[REMOVE] ${this.constructor.name} (ID: ${(this as any).id}) ->`,
      this,
    );
  }
}
