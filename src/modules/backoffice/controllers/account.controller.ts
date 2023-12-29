import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "src/shared/services/auth.service";

@Controller('v1/accounts')
export class AccountController {
    constructor(private authService: AuthService) { }

    @Get('')
    @UseGuards(AuthGuard())
    findAll() {
        return [];
    }

    @Post('')
    async createToken(): Promise<any> {
        return await this.authService.createToken();
    }
}