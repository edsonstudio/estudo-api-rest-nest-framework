import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";

import { ValidatorInterceptor } from "src/shared/interceptors/validator.interceptor";

import { CreateCustomerContract } from "../contracts/customer/create-customer.contract";
import { UpdateCustomerContract } from "../contracts/customer/update-curstomer.contract";

import { AccountService } from "../services/account.service";
import { CustomerService } from "../services/customer.service";

import { ResultDto } from "src/shared/dtos/result.dto";
import { QueryDto } from "../dtos/query.dto";
import { CreateCustomerDto } from "../dtos/customer/create-customer.dto";
import { UpdateCustomerDto } from "../dtos/customer/update-customer.dto";

import { User } from "../models/user.model";
import { Customer } from "../models/customer.model";

@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService) { }

    @Get()
    async getAll() {
        try {
            const customers = await this.customerService.findAll();
            return new ResultDto(null, true, customers, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível obter os clientes', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':document')
    async get(@Param('document') document: string) {
        try {
            const customer = await this.customerService.find(document);
            return new ResultDto(null, true, customer, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível obter o cliente', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post('query') // Validar se este é mesmo o unico modo de fazer um "GET" com parametros em uma DTO, pois no .NET existe outra forma.
    async query(@Body() model: QueryDto) {
        try {
            const customers = await this.customerService.query(model);
            return new ResultDto(null, true, customers, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível obter o cliente', false, null, error), HttpStatus.BAD_REQUEST);
        }
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
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract))
    async put(@Param('document') document: string, @Body() model: UpdateCustomerDto) {
        try {
            await this.customerService.update(document, model);
            return new ResultDto('Cliente atualizado com sucesso', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível atualizar o cliente', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':document')
    delete(@Param('document') document: string) {
        return new ResultDto('Cliente removido com sucesso', true, null, null);
    }
}