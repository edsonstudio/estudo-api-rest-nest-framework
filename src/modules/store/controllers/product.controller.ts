import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";

import { ProductService } from "../services/product.service";

import { ResultDto } from "src/shared/dtos/result.dto";

@Controller('v1/products')
export class ProductController {
    constructor(private readonly service: ProductService) { }

    @Get()
    async get() {
        try {
            const products = await this.service.get();
            return new ResultDto(null, true, products, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível obter os produtos', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}