import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResultDto } from "src/shared/dtos/result.dto";
import { ValidatorInterceptor } from "src/shared/interceptors/validator.interceptor";
import { CreatePetContract } from "../contracts/pet/create-pet.contract";
import { Pet } from "../models/pet.model";
import { PetService } from "../services/pet.service";

@ApiTags('Pets') // Tag para agrupar endpoints
@Controller('v1/pets')
export class PetController {

    constructor(private readonly service: PetService) { }

    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async createPet(@Param('document') document, @Body() model: Pet) {
        try {
            await this.service.create(document, model);
            return new ResultDto('Animal adicionado com sucesso', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível adicionar o seu animal', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async updatePet(@Param('document') document, @Param('id') id, @Body() model: Pet) {
        try {
            await this.service.update(document, id, model);
            return new ResultDto('Animal atualizado com sucesso', true, model, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível atualizar este animal', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}