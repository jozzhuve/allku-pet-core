import { describe, expect, it } from 'vitest';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('debe retornar el estado UP', () => {
    const controller = new HealthController();

    expect(controller.getHealth()).toEqual({ status: 'UP' });
  });
});
