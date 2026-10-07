import { MigrationInterface, QueryRunner } from "typeorm";

export class MeterIdObligatorio1791401792497 implements MigrationInterface {
    name = 'MeterIdObligatorio1791401792497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "readings" DROP CONSTRAINT "FK_71ebbe6741d973f1d40ed185a52"`);
        await queryRunner.query(`ALTER TABLE "readings" ALTER COLUMN "meter_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "readings" ADD CONSTRAINT "FK_71ebbe6741d973f1d40ed185a52" FOREIGN KEY ("meter_id") REFERENCES "meters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "readings" DROP CONSTRAINT "FK_71ebbe6741d973f1d40ed185a52"`);
        await queryRunner.query(`ALTER TABLE "readings" ALTER COLUMN "meter_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "readings" ADD CONSTRAINT "FK_71ebbe6741d973f1d40ed185a52" FOREIGN KEY ("meter_id") REFERENCES "meters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
