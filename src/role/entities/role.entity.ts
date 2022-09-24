


import { Column, DeleteDateColumn, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Index("role_id_uindex", ["id"], { unique: true })
@Entity("role", { schema: "blog" })
export class Role {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "role_name", length: 255 })
  roleName: string;

  @ManyToMany(
    ()=>User,{
      cascade:['soft-remove']
    }
  )
  users:User []

  @DeleteDateColumn( { name: "delete_time", nullable: true })
  deleteTime: Date | null;

}


