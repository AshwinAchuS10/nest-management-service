import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthIndicatorResult, MongooseHealthIndicator } from '@nestjs/terminus';
import { HealthCheckResponse } from 'domain/common/health.check';

@ApiTags('health')
@Controller('health')
export class HealthController {
    constructor(private db: MongooseHealthIndicator) { }

    @Get('/')
    @ApiResponse({
        type: HealthCheckResponse
    })
    async checkUserService(): Promise<HealthCheckResponse> {
        let healthCheckResponse: HealthCheckResponse = {} as HealthCheckResponse;
        try {
            let DATABASE_NAME = 'hq';
            let databasePingResponse: HealthIndicatorResult = await this.db
                .pingCheck(DATABASE_NAME)
                .catch((error) => error);
            return {
                database: {
                    status: `${DATABASE_NAME}-${databasePingResponse[DATABASE_NAME]?.status == 'up' ? 'IS_ALIVE' : 'IS_DOWN'
                        }`
                },
                service: {
                    status: `MANAGEMENT_SERVICE_WRITE-IS_ALIVE`
                }
            };
        } catch (error) {
            healthCheckResponse = {
                database: {
                    status: 'unreachable'
                },
                service: {
                    status: 'unreachable'
                }
            };
            return healthCheckResponse;
        }
    }
}
