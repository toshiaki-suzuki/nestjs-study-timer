import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1708036567450 implements MigrationInterface {
    name = 'CreateUser1708036567450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" integer NOT NULL, "password" character varying NOT NULL, "birthday" character varying NOT NULL, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
