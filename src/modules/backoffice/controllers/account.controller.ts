import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { Guid } from "guid-typescript";

import { AuthService } from "src/shared/services/auth.service";
import { AccountService } from "../services/account.service";

import { JwtAuthGuard } from "src/shared/guards/auth.guard";

import { RoleInterceptor } from "src/shared/interceptors/role.interceptor";

import { ResultDto } from "src/shared/dtos/result.dto";
import { AuthenticateDto } from "../dtos/account/authenticate.dto";
import { ResetPasswordDto } from "../dtos/account/reset-password.dto";
import { ChangePasswordDto } from "../dtos/account/change-password.dto";

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
        if (!customer) {
            throw new HttpException(new ResultDto('Usuário e/ou senha inválidos', false, null, null), HttpStatus.UNAUTHORIZED);
        }

        // Caso o usuário não esteja ativo
        if (!customer.user.active) {
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

    // Resetar a senha
    @Post('reset-password')
    async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
        try {
            // TODO: Criar funcionalidade para enviar um e-mail com a senha temporaria

            const password = Guid.create().toString().substring(0, 8);
            await this.accountService.update(model.document, { password: password });
            return new ResultDto('Uma nova senha foi enviada para o seu e-mail', true, null, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível resetar sua senha', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    // Alterar a senha
    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
        try {
            // TODO: Encriptar a senha
            await this.accountService.update(request.user.document, { password: model.newPassword }); // Atenção: Por segurança o document deve ser obtido da requisição.
            return new ResultDto('Sua senha foi alterada com sucesso!', true, null, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível alterar a sua senha', false, null, error), HttpStatus.BAD_REQUEST);
        }
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