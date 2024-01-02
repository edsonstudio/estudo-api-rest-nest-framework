import { Controller, Get, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { RoleInterceptor } from "src/shared/interceptors/role.interceptor";
import { AuthService } from "src/shared/services/auth.service";

@Controller('v1/accounts')
export class AccountController {
    constructor(private authService: AuthService) { }

    @Get('')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(new RoleInterceptor(['admin']))// Aplicar após o UseGuards para que possa 'desencriptar' o token antes de validá-lo.
    findAll() {
        return [];
    }

    @Post('')
    async createToken(): Promise<any> {
        return await this.authService.createToken();
    }
}