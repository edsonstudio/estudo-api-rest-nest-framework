import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ResultDto } from "src/shared/dtos/result.dto";
import { ValidatorInterceptor } from "src/shared/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer.contracts";
import { CreateCustomerDto } from "../dtos/create-customer.dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user.model";

@Controller('v1/customers')
export class CustomerController {

    constructor(private readonly accountService: AccountService) { }

    @Get()
    get() {
        return new ResultDto(null, true, [], null);
    }

    @Get(':document')
    getById(@Param('document') document: string) {
        return new ResultDto(null, true, {}, null);
    }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        const user = await this.accountService.create(new User(model.document, model.password, true));
        return new ResultDto('Cliente criado com sucesso', true, user, null);
    }

    @Put(':document')
    put(@Param('document') document: string, @Body() body: any) {
        return new ResultDto('Cliente alterado com sucesso', true, body, null);
    }

    @Delete(':document')
    delete(@Param('document') document: string) {
        return new ResultDto('Cliente removido com sucesso', true, null, null);
    }
}