import { describe, expect, it } from 'vitest';
import { Customer } from './customer.entity';

describe('Customer', () => {
  it('debe crear un cliente válido normalizando espacios', () => {
    const customer = Customer.create({
      fullName: '  José Hurtado  ',
      phone: '+51999999999',
    });

    expect(customer.fullName).toBe('José Hurtado');
    expect(customer.phone).toBe('+51999999999');
    expect(customer.id).toBeTruthy();
  });

  it('debe rechazar un teléfono inválido', () => {
    expect(() =>
      Customer.create({
        fullName: 'José Hurtado',
        phone: '123',
      }),
    ).toThrow('El teléfono del cliente no es válido.');
  });
});
