import { hashSync } from "bcryptjs";
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  BeforeUpdate,
  BeforeInsert,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Campaign } from "./campaign.entity";
import { Player } from "./player.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  nick: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    default:
      "https://play-lh.googleusercontent.com/0RxUnSidXheeQk4fcFCtjysbE_OX_1IwmKXoSA1w3RZQG0so1JNowmyA4mfH9S1Wih0",
  })
  profileImg: string;

  @OneToMany(() => Campaign, (campaign) => campaign.campaignMaster)
  @JoinColumn()
  campaignMaster: Campaign[];

  @OneToMany(() => Player, (player) => player.player)
  campaignPlayer: Player[];

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}

export { User };

//yarn typeorm migration:generate -d src/data-source.ts src/migrations/createUsers
//yarn typeorm migration:run -d src/data-source

//ADCIONANDO/ATUALIZANDO
//yarn typeorm migration:generate -d src/data-source.ts src/migrations/includeDefaultTypeFieldUser
//yarn typeorm migration:run -d src/data-source
