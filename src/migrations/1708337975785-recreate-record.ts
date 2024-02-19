import { MigrationInterface, QueryRunner } from "typeorm";

export class RecreateRecord1708337975785 implements MigrationInterface {
    name = 'RecreateRecord1708337975785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "record" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "material" character varying NOT NULL, "learningTime" integer NOT NULL, "description" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, CONSTRAINT "PK_5cb1f4d1aff275cf9001f4343b9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "record"`);
    }

}
