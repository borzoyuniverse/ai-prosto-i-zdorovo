import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fs from 'fs';
import path from 'path';

function loadDotEnv() {
	const candidates = [
		// monorepo root (when running from repo root)
		path.resolve(process.cwd(), '.env'),
		// monorepo root (when running from back/ cwd)
		path.resolve(process.cwd(), '../.env'),
		// back workspace root (when cwd is repo root)
		path.resolve(process.cwd(), 'back/.env'),
		// dist-relative
		path.resolve(__dirname, '../../.env'),
		path.resolve(__dirname, '../../../.env'),
		// src-relative (ts-node)
		path.resolve(__dirname, '../.env'),
		path.resolve(__dirname, '../../.env')
	];
	for (const file of candidates) {
		try {
			if (!fs.existsSync(file)) continue;
			const content = fs.readFileSync(file, 'utf8');
			for (const line of content.split(/\r?\n/)) {
				const trimmed = line.trim();
				if (!trimmed || trimmed.startsWith('#')) continue;
				const eq = trimmed.indexOf('=');
				if (eq <= 0) continue;
				const key = trimmed.slice(0, eq).trim();
				let val = trimmed.slice(eq + 1).trim();
				if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith('\'') && val.endsWith('\''))) {
					val = val.slice(1, -1);
				}
				if (!(key in process.env)) process.env[key] = val;
			}
			// eslint-disable-next-line no-console
			console.log(`[env] loaded ${file}`);
			break; // stop at first found
		} catch {}
	}
}

export async function bootstrap(portArg?: number) {
	loadDotEnv();
	const port = Number(portArg ?? process.env.PORT ?? 3000);
	const app = await NestFactory.create(AppModule, { logger: false });
	app.enableCors({ origin: true, credentials: true });
	await app.listen(port, '127.0.0.1');
	return app;
}

if (require.main === module) {
	bootstrap();
}
