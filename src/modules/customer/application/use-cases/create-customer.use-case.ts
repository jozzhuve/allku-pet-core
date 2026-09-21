import { Inject, Injectable } from '@nestjs/common';
import { Customer } from '../../domain/entities/customer.entity';
import {
  CUSTOMER_REPOSITORY,
  type CustomerRepository,
} from '../../domain/ports/customer.repository';

export type CreateCustomerCommand = {
  fullName: string;
  phone: string;
};

export type CreateCustomerResult = {
  id: string;
  fullName: string;
  phone: string;
};

@Injectable()
export class CreateCustomerUseCase {
  public constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository,
  ) {}

  public async execute(command: CreateCustomerCommand): Promise<CreateCustomerResult> {
    const existingCustomer = await this.customerRepository.findByPhone(command.phone);

    if (existingCustomer) {
      return {
        id: existingCustomer.id,
        fullName: existingCustomer.fullName,
        phone: existingCustomer.phone,
      };
    }

    const customer = Customer.create(command);
    await this.customerRepository.save(customer);

    return {
      id: customer.id,
      fullName: customer.fullName,
      phone: customer.phone,
    };
  }
}
