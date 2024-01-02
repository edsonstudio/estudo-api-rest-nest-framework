import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";

import { AuthService } from "src/shared/services/auth.service";
import { AccountService } from "../services/account.service";

import { JwtAuthGuard } from "src/shared/guards/auth.guard";

import { RoleInterceptor } from "src/shared/interceptors/role.interceptor";

import { ResultDto } from "src/shared/dtos/result.dto";
import { AuthenticateDto } from "../dtos/account/authenticate.dto";

@Controller('v1/accounts')
export class AccountController {
    constructor(
        private authService: AuthService,
        private accountService: AccountService) { }

    // Autenticar
    @Post('authenticate')
    async authenticate(@Body() model: AuthenticateDto): Promise<any> {
        const customer = await this.accountService.authenticate(model.username, model.password);

        // Caso não encontre o usuário
        if(!customer) {
            throw new HttpException(new ResultDto('Usuário e/ou senha inválidos', false, null, null), HttpStatus.UNAUTHORIZED);
        }

        // Caso o usuário não esteja ativo
        if(!customer.user.active) {
            throw new HttpException(new ResultDto('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);
        }

        // Gera e retorna o token
        const token = await this.authService.createToken(customer.document, customer.email, '', customer.user.roles);
        // Exemplo 1:
        return new ResultDto(null, true, token, null);

        // Exemplo 2:
        // return new ResultDto(null, true, {
        //     name: customer.name,
        //     document: customer.document,
        //     email: customer.email,
        //     token: token
        // }, null);
    }


    // Endpoints apenas para fins didaticos e testes
    // @Get('')
    // @UseGuards(JwtAuthGuard)
    // @UseInterceptors(new RoleInterceptor(['admin']))// Aplicar após o UseGuards para que possa 'desencriptar' o token antes de validá-lo.
    // findAll() {
    //     return [];
    // }

    // @Post('')
    // async createToken(): Promise<any> {
    //     return await this.authService.createToken();
    // }
}