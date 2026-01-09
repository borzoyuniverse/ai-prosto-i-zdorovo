import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { JsonRpcController } from './jsonrpc.controller';
import { JsonRpcService } from './jsonrpc.service';

@Module({
	imports: [],
	controllers: [HealthController, JsonRpcController],
	providers: [JsonRpcService]
})
export class AppModule {}
