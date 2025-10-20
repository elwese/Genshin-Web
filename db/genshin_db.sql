drop database if exists genshin_db;
create database genshin_db;
use genshin_db;

create table usuario(
	id_usuario int unique auto_increment,
    id_usuario_genshin varchar(30) not null unique,
    nombre varchar(30) not null,
    correo varchar(50) not null,
    contrasena varchar(30) not null,
    fecha_registro datetime default current_timestamp,
    primary key (id_usuario)
);

create table personaje_base(
    id_personaje int unique auto_increment,
    nombre varchar(30) not null unique,
    estrellas int not null default 4,
    elemento enum('anemo', 'geo', 'electro', 'hydro', 'pyro', 'cryo', 'dendro') not null,
    arma enum('espada', 'mandoble', 'catalizador', 'arco', 'lanza') not null,
    region enum('mondstadt', 'liyue', 'inazuma', 'sumeru', 'fontaine', 'natlan', 'nod-krai','snezhnaya') not null,
    archivo_explicacion JSON,
    archivo_datos JSON,
    primary key (id_personaje)
);

create table arma_base(
    id_arma int unique auto_increment,
    nombre varchar(30) not null unique,
    descripcion varchar(255) not null,
    estrellas int not null default 1,
    tipo enum('espada', 'mandoble', 'catalizador', 'arco', 'lanza') not null,
    ataque_base int not null default 1,
    bono_secundario enum('ATQ_P','DEF_P','VIDA_P','M_ELEMENTAL','RECARGA_E','D_CRIT','P_CRIT','B_FISICO') not null,
    archivo_bono JSON,

    primary key (id_arma)
);

create table artefacto_base(
    id_artefacto int unique auto_increment,
    tipo enum('flor','pluma','reloj','copa','tiara') not null,
    estrellas int not null default 1,
    nombre_set varchar(30) not null,
    descripcion_set varchar(255) not null,
    bono_set JSON,
    primary key (id_artefacto)

);

create table artefacto_creado(
   id_artefacto int unique auto_increment,
   id_artefacto_base int,
   id_usuario int,
   nivel int not null default 0,
   bono_principal enum('VIDA','VIDA_P','ATQ','ATQ_P','DEF','DEF_P','M_ELEMENTAL','RECARGA_E','D_CRIT','P_CRIT','D_FISICO','D_ANEMO','D_CRYO','D_GEO','D_PYRO','D_DENDRO','D_HYDRO','D_ELECTRO') not null,
   bono_principal_valor float not null default 0.0,


   primary key (id_artefacto),
   foreign key (id_artefacto_base) references artefacto_base(id_artefacto),
   foreign key (id_usuario) references usuario(id_usuario) 
);

create table bono_artefacto_secundario(
    id_bono int unique auto_increment,
    id_artefacto_creado int,
    bono enum('VIDA_P','VIDA','ATQ','ATQ_P','DEF','DEF_P','M_ELEMENTAL','RECARGA_E','D_CRIT','P_CRIT') not null,
    valor float not null default 0.0,
    primary key (id_bono),
    foreign key (id_artefacto_creado) references artefacto_creado(id_artefacto)
);

create table arma_creada(
    id_arma int unique auto_increment,
    id_arma_base int,
    id_usuario int,

    nivel int not null default 1,
    refinamiento int not null default 1,
    ataque_creado float not null default 0.0,
    bono_secundario_valor float not null default 0.0,

    primary key (id_arma),
    foreign key (id_arma_base) references arma_base(id_arma),
    foreign key (id_usuario) references usuario(id_usuario)
);

create table personaje_creado(
    id_personaje int unique auto_increment,
    id_personaje_base int,
    id_usuario int,
    id_arma int,

    nivel int not null default 1,
    vida float not null default 0,
    ataque float not null default 0,
    defensa float not null default 0,
    maestria_elemental float not null default 0,
    prob_critico float not null default 5.0,
    danio_critico float not null default 50.0,
    recarga_energia float not null default 100.0,

    bono_proteccion_escudo float not null default 0.0,

    bono_anemo float not null default 0.0,
    bono_geo float not null default 0.0,
    bono_electro float not null default 0.0,
    bono_hydro float not null default 0.0,
    bono_pyro float not null default 0.0,
    bono_cryo float not null default 0.0,
    bono_dendro float not null default 0.0,
    bono_fisico float not null default 0.0,
    bono_curacion float not null default 0.0,

    resistencia_anemo float not null default 0.0,
    resistencia_geo float not null default 0.0,
    resistencia_electro float not null default 0.0,
    resistencia_hydro float not null default 0.0,
    resistencia_pyro float not null default 0.0,
    resistencia_cryo float not null default 0.0,
    resistencia_dendro float not null default 0.0,
    resistencia_fisico float not null default 0.0,

    nivel_basicos int not null default 1,
    nivel_elememntal int not null default 1,
    nivel_ult int not null default 1,

    nivel_constelacion int not null default 0,

    artefacto_1 int,
    artefacto_2 int,
    artefacto_3 int,
    artefacto_4 int,
    artefacto_5 int,

    primary key (id_personaje),
    foreign key (id_personaje_base) references personaje_base(id_personaje),
    foreign key (id_usuario) references usuario(id_usuario),
    foreign key (id_arma) references arma_creada(id_arma),
    foreign key (artefacto_1) references artefacto_creado(id_artefacto),
    foreign key (artefacto_2) references artefacto_creado(id_artefacto),
    foreign key (artefacto_3) references artefacto_creado(id_artefacto),
    foreign key (artefacto_4) references artefacto_creado(id_artefacto),
    foreign key (artefacto_5) references artefacto_creado(id_artefacto)
);

create table equipo(
    id_equipo int unique auto_increment,
    id_usuario int,
    nombre varchar(30) not null,
    descripcion varchar(255),
    personaje_1 int,
    personaje_2 int,
    personaje_3 int,
    personaje_4 int,

    primary key (id_equipo),
    foreign key (id_usuario) references usuario(id_usuario),
    foreign key (personaje_1) references personaje_creado(id_personaje),
    foreign key (personaje_2) references personaje_creado(id_personaje),
    foreign key (personaje_3) references personaje_creado(id_personaje),
    foreign key (personaje_4) references personaje_creado(id_personaje)
);

select * from personaje_creado;
select * from personaje_base;

select * from arma_creada;
select * from usuario;
select * from arma_base;
select * from artefacto_base;
select * from artefacto_creado;
select * from bono_artefacto_secundario;

insert into arma_base (nombre,descripcion,estrellas,tipo,ataque_base,bono_secundario,archivo_bono) values("ARMA2","PRIMERA ARMA",5,"lanza",125,"ATQ_P",NULL);
insert into usuario (id_usuario_genshin,nombre,correo,contrasena) values ("123456","ews","correo","adasda");
insert into artefacto_base (tipo, estrellas, nombre_set, descripcion_set, bono_set) values ("flor",5,"tilin set","el bono del tilin",null);

