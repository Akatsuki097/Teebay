CREATE TABLE product (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(255)   NOT NULL,
  category    VARCHAR(50)    NOT NULL,
  description TEXT,
  price       NUMERIC       NOT NULL,
  summary     TEXT,
  owner_id    INTEGER       NOT NULL
);