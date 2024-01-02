import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { ProductService } from "../services/product.service";

import { ResultDto } from "src/shared/dtos/result.dto";
import { Product } from "../entities/product.entity";

@ApiTags('Products') // Tag para agrupar endpoints
@Controller('v1/products')
export class ProductController {
    constructor(private readonly service: ProductService) { }

    @Get()
    async get() {
        try {
            const products = await this.service.get();
            return new ResultDto(null, true, products, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível obter os cliente', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async post(@Body() model: Product) {
        try {
            await this.service.post(model);
            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar o produto', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async put(@Param('id') id: number, @Body() model: Product) {
        try {
            await this.service.put(id, model);
            return new ResultDto(null, true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível atualizar o produto', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        try {
            await this.service.delete(id);
            return new ResultDto('O produto foi removido com sucesso', true, null, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível remover o produto', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}