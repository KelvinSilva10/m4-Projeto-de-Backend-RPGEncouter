import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity("friends")
class Friend {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nick: string;

  @ManyToOne(() => User, (user) => user.friends)
  user: User;
}

export default Friend;
