import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionToUser1708125203352 implements MigrationInterface {
    name = 'AddDescriptionToUser1708125203352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "description"`);
    }

}
