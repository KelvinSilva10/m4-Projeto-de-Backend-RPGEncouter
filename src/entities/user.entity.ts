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

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column()
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

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
