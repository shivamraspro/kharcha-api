import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor<T> {
  new (...args: any[]): T;
}

export function Serialize<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

export class SerializerInterceptor<T> implements NestInterceptor<unknown, T> {
  constructor(private readonly dto: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    // Run something before a request is handled by the request handler
    // console.log('Before the request is handled');

    return next.handle().pipe(
      map((data) => {
        // Run something before the response is sent out
        // console.log('Before the response is sent out');
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
