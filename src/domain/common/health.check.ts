import { ApiProperty } from '@nestjs/swagger';

class DatabaseStatus {
    @ApiProperty()
    status: string;
}

class ServiceStatus {
    @ApiProperty()
    status: string;
}

export class HealthCheckResponse {
    @ApiProperty({
        type: DatabaseStatus
    })
    database: DatabaseStatus;
    @ApiProperty({
        type: ServiceStatus
    })
    service: ServiceStatus;
}
