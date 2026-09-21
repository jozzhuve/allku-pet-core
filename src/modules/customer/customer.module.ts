import { Module } from '@nestjs/common';
import { CustomerController } from './api/http/customer.controller';
import { CreateCustomerUseCase } from './application/use-cases/create-customer.use-case';
import { CUSTOMER_REPOSITORY } from './domain/ports/customer.repository';
import { PrismaCustomerRepository } from './infrastructure/persistence/prisma-customer.repository';

@Module({
  controllers: [CustomerController],
  providers: [
    CreateCustomerUseCase,
    PrismaCustomerRepository,
    {
      provide: CUSTOMER_REPOSITORY,
      useExisting: PrismaCustomerRepository,
    },
  ],
})
export class CustomerModule {}
