import type { Customer } from '../entities/customer.entity';

export const CUSTOMER_REPOSITORY = Symbol('CUSTOMER_REPOSITORY');

export interface CustomerRepository {
  findByPhone(phone: string): Promise<Customer | null>;
  save(customer: Customer): Promise<void>;
}
