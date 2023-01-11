import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserPlayerCampaign1673372849648 implements MigrationInterface {
    name = 'createUserPlayerCampaign1673372849648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "nick" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(120) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "profileImg" character varying NOT NULL DEFAULT 'https://play-lh.googleusercontent.com/0RxUnSidXheeQk4fcFCtjysbE_OX_1IwmKXoSA1w3RZQG0so1JNowmyA4mfH9S1Wih0', CONSTRAINT "UQ_7c154ca1d4ac730c755cfce9b7c" UNIQUE ("nick"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "campaigns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "campaignName" character varying(50) NOT NULL, "playersAmount" integer NOT NULL, "description" character varying(3000) NOT NULL, "rpgGame" character varying(50) NOT NULL, "campaignImg" character varying NOT NULL DEFAULT 'https://kanto.legiaodosherois.com.br/w760-h398-cfill/wp-content/uploads/2020/08/legiao_9b0AChMUGzL4.jpg.webp', "plataform" character varying(50) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "campaignMasterId" uuid, CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "players" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "playerId" uuid, "campaignId" uuid, CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "FK_558f47799d311cd1e1674694701" FOREIGN KEY ("campaignMasterId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_7aefa05088ed891a31b5c6cdc49" FOREIGN KEY ("playerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "FK_5dcf2955b92c42c457fe666ca94" FOREIGN KEY ("campaignId") REFERENCES "campaigns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_5dcf2955b92c42c457fe666ca94"`);
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "FK_7aefa05088ed891a31b5c6cdc49"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "FK_558f47799d311cd1e1674694701"`);
        await queryRunner.query(`DROP TABLE "players"`);
        await queryRunner.query(`DROP TABLE "campaigns"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
