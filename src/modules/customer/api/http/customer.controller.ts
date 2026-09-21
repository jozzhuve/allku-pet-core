import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateCustomerUseCase } from '../../application/use-cases/create-customer.use-case';
import { createCustomerSchema } from './customer.schemas';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  public constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  @Post()
  @ApiCreatedResponse({ description: 'Cliente creado o recuperado por teléfono.' })
  public async create(@Body() body: unknown): Promise<{
    id: string;
    fullName: string;
    phone: string;
  }> {
    const parsed = createCustomerSchema.safeParse(body);

    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten());
    }

    return this.createCustomerUseCase.execute(parsed.data);
  }
}
