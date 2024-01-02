import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ValidatorInterceptor } from "src/shared/interceptors/validator.interceptor";
import { ResultDto } from "src/shared/dtos/result.dto";
import { Address } from "../models/address.model";
import { CreateAddressContract } from "../contracts/address/create-address.contract";
import { AddressService } from "../services/address.service";
import { AddressType } from "../enums/address-type.enum";

@ApiTags('Addresses') // Tag para agrupar endpoints
@Controller('v1/addresses')
export class AddressController {

    constructor(private readonly service: AddressService) { }

    @Get('search/:zipcode')
    async search(@Param('zipcode') zipcode: string) {
        try {
            const response = await this.service.getAddressByZipCode(zipcode).toPromise(); //Obs.: O metodo toPromise() está obsoleto nesta versão do Nest.JS
            return new ResultDto(null, true, response.data, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível localizar o seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

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