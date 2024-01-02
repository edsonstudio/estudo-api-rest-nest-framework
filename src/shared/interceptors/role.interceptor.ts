import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ResultDto } from "../dtos/result.dto";

@Injectable()
export class RoleInterceptor implements NestInterceptor {

    constructor(public roles: string[]) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const payload: JwtPayload = context.switchToHttp().getRequest().user;
        console.log("payload do role interceptor: ", payload);

        // Resultado do console.log:

        // payload do role interceptor:  {
        //     document: '12345678901',
        //     email: 'edson@teste.com',
        //     image: 'assets/images/user.png',
        //     roles: [ 'admin' ],
        //     iat: 1704193988,
        //     exp: 1704197588
        //   }

        let hasRole = false;

        payload.roles.forEach((role) => {
            if (this.roles.includes(role))
                hasRole = true;
        });

        if (!hasRole) {
            throw new HttpException(new ResultDto('Acesso não autorizado', false, null, null), HttpStatus.FORBIDDEN);
        }

        return next
            .handle()
            .pipe();
    }

}