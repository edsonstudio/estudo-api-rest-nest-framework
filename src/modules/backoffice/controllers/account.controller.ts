import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { AuthService } from "src/shared/services/auth.service";

@Controller('v1/accounts')
export class AccountController {
    constructor(private authService: AuthService) { }

    @Get('')
    @UseGuards(JwtAuthGuard)
    findAll() {
        return [];
    }

    @Post('')
    async createToken(): Promise<any> {
        return await this.authService.createToken();
    }
}