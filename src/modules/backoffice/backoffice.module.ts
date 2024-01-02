import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';

import { ConfigService } from '@nestjs/config';

import { AccountController } from './controllers/account.controller';
import { AddressController } from './controllers/address.controller';
import { CustomerController } from './controllers/customer.controller';
import { PetController } from './controllers/pet.controller';

import { AccountService } from './services/account.service';
import { AddressService } from './services/address.service';
import { AuthService } from 'src/shared/services/auth.service';
import { CustomerService } from './services/customer.service';
import { PetService } from './services/pet.service';

import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';

import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';

@Module({
    imports: [
        CacheModule.register(),
        HttpModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        // JwtModule.register({ // Versão sem o Nest Config
        //     secret: 'CHAVE-SECRETA-TEMPORARIA',
        //     // secretOrPrivateKey: 'CHAVE-SECRETA-TEMPORARIA', // Obsoleto, gera erros no console.
        //     signOptions: {
        //         expiresIn: 3600
        //     }
        // }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('JWT_SECRET_KEY'),
                    signOptions: {
                        expiresIn: configService.get<number>('JWT_EXPIRATION_TIME'),
                    },
                };
            },
        }),
        MongooseModule.forFeature(
            [
                {
                    name: 'Customer',
                    schema: CustomerSchema
                },
                {
                    name: 'User',
                    schema: UserSchema
                }
            ]
        )
    ],
    controllers: [
        AccountController,
        AddressController,
        CustomerController,
        PetController
    ],
    providers: [
        AuthService,
        AccountService,
        AddressService,
        CustomerService,
        JwtStrategy,
        PetService
    ]
})
export class BackofficeModule { }
