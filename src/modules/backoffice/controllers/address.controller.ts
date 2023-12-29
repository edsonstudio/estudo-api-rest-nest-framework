import { Body, Controller, HttpException, HttpStatus, Param, Post, UseInterceptors } from "@nestjs/common";
import { ResultDto } from "src/shared/dtos/result.dto";
import { ValidatorInterceptor } from "src/shared/interceptors/validator.interceptor";
import { Address } from "../models/address.model";
import { CreateAddressContract } from "../contracts/address/create-address.contract";
import { AddressService } from "../services/address.service";
import { AddressType } from "../enums/address-type.enum";

@Controller('v1/addresses')
export class AddressController {

    constructor(private readonly service: AddressService) { }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.service.create(document, model, AddressType.Billing);
            return new ResultDto('Endereço adicionado com sucesso', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar o seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address) {
        try {
            await this.service.create(document, model, AddressType.Shipping);
            return new ResultDto('Endereço adicionado com sucesso', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar o seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}