import { Logger } from '@myorganisationtbc/common';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

class LoggerService {
    public log: any;

    public async init() {
        this.log = new Logger(
            await Logger.init(
                [
                    new DailyRotateFile({
                        filename: 'debug-log',
                        level: 'debug',
                        json: true,
                        maxFiles: '7d',
                        zippedArchive: true
                    }),
                    new winston.transports.Console({ level: 'debug' })
                ],
                winston.format.combine(winston.format.timestamp(), winston.format.json()),
                {
                    service: process.env.SERVICE_NAME
                }
            )
        );
    }
}

const logger = new LoggerService();

export default logger;
