-- TABELA DE USUÁRIO

CREATE TABLE public.usuario (
	email varchar NOT NULL,
	nome varchar NOT NULL,
	senha varchar NOT NULL,
	CONSTRAINT usuario_pk PRIMARY KEY (email)
);
