import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { Customer } from "../models/customer.model";
import { ResultDto } from "src/shared/dtos/result.dto";
import { ValidatorInterceptor } from "src/shared/interceptors/validator.interceptor";
import { CreateCustomerContract } from "../contracts/customer.contracts";

@Controller('v1/customers')
export class CustomerController {
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
    post(@Body() body: Customer) {
        return new ResultDto('Cliente criado com sucesso', true, body, null);
    }

    @Put(':document')
    put(@Param('document') document: string, @Body() body: Customer) {
        return new ResultDto('Cliente alterado com sucesso', true, body, null);
    }
    
    @Delete(':document')
    delete(@Param('document') document: string) {
        return new ResultDto('Cliente removido com sucesso', true, null, null);
    }
}