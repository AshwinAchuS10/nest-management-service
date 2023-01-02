import bunyan from 'bunyan';
import { Logger } from '@myorganisationtbc/common';

class LoggerService {
    public log: any;

    public async init() {
        this.log = new Logger(
            await Logger.init(
                `${process.env.SERVICE_NAME}`,
                [
                    {
                        level: 'trace',
                        stream: process.stdout
                    },
                    {
                        level: 'trace',
                        type: 'rotating-file',
                        path: `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}-traces.log`,
                        period: '1d'
                    }
                ],
                bunyan.stdSerializers
            )
        );
    }
}

const logger = new LoggerService();

export default logger;
