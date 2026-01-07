import { DataSource } from 'typeorm';

async function main() {
	const url = process.env.DATABASE_URL;
	if (!url) {
		console.error('seed: DATABASE_URL is not set');
		process.exit(1);
	}
	const ds = new DataSource({ type: 'postgres', url, entities: [], synchronize: false, logging: false });
	await ds.initialize();
	try {
		await ds.query(`SELECT 1 FROM app_settings LIMIT 1`).catch(() => {
			throw new Error('app_settings table not found; run migrations first');
		});

		await ds.query(
			`INSERT INTO app_settings (key, value) VALUES ($1,$2) ON CONFLICT (key) DO NOTHING`,
			['app_name', 'App Template']
		);

		console.log('seed: done');
	} finally {
		await ds.destroy();
	}
}

main().catch((e) => { console.error(e); process.exit(1); });
