import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1700000000000 implements MigrationInterface {
	name = 'Initial1700000000000'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('CREATE SCHEMA IF NOT EXISTS public');
		await queryRunner.query('SET search_path TO public');
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS app_settings (
				key TEXT PRIMARY KEY,
				value TEXT,
				created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
			)
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE IF EXISTS app_settings;');
	}
}
