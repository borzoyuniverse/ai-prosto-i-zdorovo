import { DataSource } from 'typeorm';
import { Initial1700000000000 } from '../db/migrations/1700000000000-initial';

async function main() {
	const url = process.env.DATABASE_URL;
	if (!url) {
		console.error('migrate: DATABASE_URL is not set');
		process.exit(1);
	}
	const ds = new DataSource({ type: 'postgres', url, entities: [], synchronize: false, logging: false });
	await ds.initialize();
	try {
		const runner = ds.createQueryRunner();
		await runner.connect();
		await new Initial1700000000000().up(runner);
		await runner.release();
		console.log('migrate: initial migration applied');
	} finally {
		await ds.destroy();
	}
}

main().catch((e) => { console.error(e); process.exit(1); });
