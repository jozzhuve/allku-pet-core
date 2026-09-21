import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Customer } from '../../domain/entities/customer.entity';
import type { CustomerRepository } from '../../domain/ports/customer.repository';
import { CreateCustomerUseCase } from './create-customer.use-case';

describe('CreateCustomerUseCase', () => {
  let repository: CustomerRepository;
  let useCase: CreateCustomerUseCase;

  beforeEach(() => {
    repository = {
      findByPhone: vi.fn(),
      save: vi.fn(),
    };
    useCase = new CreateCustomerUseCase(repository);
  });

  it('debe crear y persistir un cliente cuando el teléfono no existe', async () => {
    vi.mocked(repository.findByPhone).mockResolvedValue(null);

    const result = await useCase.execute({
      fullName: 'José Hurtado',
      phone: '+51999999999',
    });

    expect(result.fullName).toBe('José Hurtado');
    expect(repository.save).toHaveBeenCalledOnce();
  });

  it('debe reutilizar el cliente existente y no duplicarlo', async () => {
    const existing = Customer.rehydrate({
      id: 'customer-1',
      fullName: 'José Hurtado',
      phone: '+51999999999',
      createdAt: new Date(),
    });
    vi.mocked(repository.findByPhone).mockResolvedValue(existing);

    const result = await useCase.execute({
      fullName: 'José',
      phone: '+51999999999',
    });

    expect(result.id).toBe('customer-1');
    expect(repository.save).not.toHaveBeenCalled();
  });
});
