import { MigrationInterface, QueryRunner } from "typeorm";

export class DisableRecordDescriptionNotNullConstraint1711764859041 implements MigrationInterface {
    name = 'DisableRecordDescriptionNotNullConstraint1711764859041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "record" ALTER COLUMN "description" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "record" ALTER COLUMN "description" SET NOT NULL`);
    }

}
