import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import { Customer } from '../../domain/entities/customer.entity';
import type { CustomerRepository } from '../../domain/ports/customer.repository';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  public constructor(private readonly prisma: PrismaService) {}

  public async findByPhone(phone: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { phone },
    });

    if (!customer) {
      return null;
    }

    return Customer.rehydrate({
      id: customer.id,
      fullName: customer.fullName,
      phone: customer.phone,
      createdAt: customer.createdAt,
    });
  }

  public async save(customer: Customer): Promise<void> {
    await this.prisma.customer.create({
      data: {
        id: customer.id,
        fullName: customer.fullName,
        phone: customer.phone,
        createdAt: customer.createdAt,
      },
    });
  }
}
