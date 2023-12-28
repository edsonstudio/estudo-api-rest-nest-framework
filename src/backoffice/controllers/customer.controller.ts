import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ResultDto } from "src/shared/dtos/result.dto";
import { ValidatorInterceptor } from "src/shared/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer.contracts";
import { CreateCustomerDto } from "../dtos/create-customer.dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user.model";
import { CustomerService } from "../services/customer.service";
import { Customer } from "../models/customer.model";

@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService) { }

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

        try {
            const user = await this.accountService.create(new User(model.document, model.password, true));
            const customer = await this.customerService.create(new Customer(model.name, model.document, model.email, [], null, null, null, user));
            return new ResultDto('Cliente criado com sucesso', true, customer, null);
        } catch (error) {
            //TODO: Criar um rollback manual
            throw new HttpException(new ResultDto('Não foi possível criar o seu cadastro', false, null, error), HttpStatus.BAD_REQUEST);
        }

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