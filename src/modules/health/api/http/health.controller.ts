import { Controller, Get } from '@nestjs/common';

type HealthResponse = {
  status: 'UP';
};

@Controller('health')
export class HealthController {
  @Get()
  public getHealth(): HealthResponse {
    return { status: 'UP' };
  }
}
