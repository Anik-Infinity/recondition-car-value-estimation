import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { plainToClass } from 'class-transformer';
import { handleRetry } from '@nestjs/typeorm';

export class SerializeInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run somethin before the reponse is sent out
        // by the request handler
        console.log('Im running before the handler', context);

        return handler.handle().pipe(
            map((data: any) => {
                // Run something before the response is set out
                console.log('Im running before response is sent out', data);
                return data
            })
        )
    }
}
