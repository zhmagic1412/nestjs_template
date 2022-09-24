create table role
(
    id          int auto_increment
        primary key,
    role_name   varchar(255) charset utf8 not null,
    delete_time timestamp                 null,
    constraint role_id_uindex
        unique (id)
);

create table user
(
    id          int auto_increment
        primary key,
    username    varchar(255)                        not null,
    password    varchar(255)                        not null,
    email       varchar(255)                        null,
    create_time timestamp default CURRENT_TIMESTAMP not null,
    update_time timestamp                           null,
    delete_time timestamp                           null,
    constraint user_id_uindex
        unique (id)
)
    charset = utf8;

create table user_role
(
    user_id int not null,
    role_id int not null
);


