
ALTER TABLE product
  RENAME COLUMN owner_id TO created_by_id;

ALTER TABLE product
  ADD CONSTRAINT fk_product_created_by
  FOREIGN KEY (created_by_id)
  REFERENCES "user"(id)
  ON DELETE CASCADE;
