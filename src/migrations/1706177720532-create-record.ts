import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecord1706177720532 implements MigrationInterface {
    name = 'CreateRecord1706177720532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "record" ("id" SERIAL NOT NULL, "material" character varying NOT NULL, "learning_time" integer NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_5cb1f4d1aff275cf9001f4343b9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "record"`);
    }

}
