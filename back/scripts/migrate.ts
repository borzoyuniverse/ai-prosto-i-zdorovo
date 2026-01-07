import dataSource from '../ormconfig.js';

async function main() {
	if (!process.env.DATABASE_URL) {
		console.error('migrate: DATABASE_URL is not set');
		process.exit(1);
	}
	await dataSource.initialize();
	try {
		const res = await dataSource.runMigrations({ transaction: 'each' });
		console.log(`migrate: applied ${res.length} migration(s)`);
	} finally {
		await dataSource.destroy();
	}
}

main().catch((e) => { console.error(e); process.exit(1); });
