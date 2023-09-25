

CREATE TABLE tasks
(
    id SERIAL Primary Key ,
    name text not null ,
    status int not null ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);