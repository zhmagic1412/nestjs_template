import {
    Column, DeleteDateColumn,
    CreateDateColumn,UpdateDateColumn,
    Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn
} from "typeorm";
import {Role} from "../../role/entities/role.entity";
import dayjs from "dayjs";
import {Transform} from "class-transformer";

@Entity("user", {schema: "blog"})
export class User {
    @PrimaryGeneratedColumn({type: 'int', name: "id"})
    id: number;

    @Column("varchar", {name: "username", length: 255})
    username: string;

    @Column("varchar", {name: "password", length: 255})
    password: string;

    @Column("varchar", {name: "email", nullable: true, length: 255})
    email: string | null;

    @ManyToMany(() => Role)
    @JoinTable(
        {
            name: "user_role",
            joinColumn: {
                name: "user_id",
                referencedColumnName: "id"
            },
            inverseJoinColumn: {
                name: "role_id",
                referencedColumnName: "id"
            }
        }
    )
    roles: Role[]

    @Transform(({value})=>{return  dayjs(value).unix()})
    @CreateDateColumn({
        name: "create_time",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    createTime: Date;

    @Transform(({value})=>{return value?dayjs(value).unix():null})
    @UpdateDateColumn( { name: "update_time", nullable: true,type:'timestamp'})
    updateTime: Date | null;

    @DeleteDateColumn({name: "delete_time", nullable: true})
    deleteTime: Date | null;
}


