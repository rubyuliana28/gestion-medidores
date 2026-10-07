import { MigrationInterface, QueryRunner } from "typeorm";

export class CrearTablas1791401566734 implements MigrationInterface {
    name = 'CrearTablas1791401566734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "readings" ("id" SERIAL NOT NULL, "kwh" double precision NOT NULL, "date" date NOT NULL, "meter_id" integer, CONSTRAINT "PK_a0f3aa79140b41884f2e53ba52a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meters" ("id" SERIAL NOT NULL, "serial" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "UQ_adb41db373405315c4d7ae7cac9" UNIQUE ("serial"), CONSTRAINT "PK_0a71b52dbb545fa36efaf070583" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "readings" ADD CONSTRAINT "FK_71ebbe6741d973f1d40ed185a52" FOREIGN KEY ("meter_id") REFERENCES "meters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "readings" DROP CONSTRAINT "FK_71ebbe6741d973f1d40ed185a52"`);
        await queryRunner.query(`DROP TABLE "meters"`);
        await queryRunner.query(`DROP TABLE "readings"`);
    }

}
