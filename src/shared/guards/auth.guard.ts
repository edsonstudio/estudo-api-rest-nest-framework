import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard() {
    canActivate(context: ExecutionContext){
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any) {
        // Sugestão: Aqui pode ser verificada se a role do usuario que veio na requisição é Admin, caso seja
        // fazer uma consulta no banco se o mesmo ainda possui esta role, pois o token pode ser antigo e o usuario neste periodo
        // pode ter sido removido de sua role o perfil de Admin.

        // Atenção: Não deve ser feita consulta ao banco para casos onde praticamente todos os tipos de usuarios necessitem de consulta,
        // pois toda requisição irá fazer essa consulta, o que será muito custoso para a aplicação.
        if(err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}