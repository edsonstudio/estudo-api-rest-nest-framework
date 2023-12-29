import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/shared/guards/auth.guard";
import { AuthService } from "src/shared/services/auth.service";

@Controller('v1/accounts')
export class AccountController {
    constructor(private authService: AuthService) { }

    @Get('')
    @UseGuards(JwtAuthGuard)
    findAll(@Req() request) {
        console.log('request.user: ', request.user);
        return [];
    }

    @Post('')
    async createToken(): Promise<any> {
        return await this.authService.createToken();
    }
}