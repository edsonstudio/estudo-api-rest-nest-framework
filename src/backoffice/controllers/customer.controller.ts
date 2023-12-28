import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ResultDto } from "src/shared/dtos/result.dto";
import { ValidatorInterceptor } from "src/shared/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer/create-customer.contract";
import { CreateCustomerDto } from "../dtos/create-customer.dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user.model";
import { CustomerService } from "../services/customer.service";
import { Customer } from "../models/customer.model";
import { Address } from "../models/address.model";
import { CreateAddressContract } from "../contracts/customer/create-address.contract";
import { CreatePetContract } from "../contracts/customer/create-pet.contract";
import { Pet } from "../models/pet.model";

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

    @Post(':document/addresses/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.customerService.addBillingAddress(document, model);
            return new ResultDto('Endereço adicionado com sucesso', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar o seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/addresses/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.customerService.addShippingAddress(document, model);
            return new ResultDto('Endereço adicionado com sucesso', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar o seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/pets')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async createPet(@Param('document') document, @Body() model: Pet) {
        try {
            await this.customerService.createPet(document, model);
            return new ResultDto('Animal adicionado com sucesso', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar o seu animal', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document/pets/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet) {
        try {
            await this.customerService.updatePet(document, id, model);
            return new ResultDto('Animal atualizado com sucesso', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível atualizar este animal', false, null, error), HttpStatus.BAD_REQUEST);
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