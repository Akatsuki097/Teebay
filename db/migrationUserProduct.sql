-- 1) Rename the owner_id column to match our GraphQL/JPA field:
ALTER TABLE product
  RENAME COLUMN owner_id TO created_by_id;

-- 2) (Optional) Drop any old foreign-key on owner_id first; if you have one:
-- ALTER TABLE product DROP CONSTRAINT IF EXISTS product_owner_id_fkey;

-- 3) Add the new FK constraint so Postgres enforces referential integrity:
ALTER TABLE product
  ADD CONSTRAINT fk_product_created_by
  FOREIGN KEY (created_by_id)
  REFERENCES "user"(id)
  ON DELETE CASCADE;

-- 4) (Optional) If you ever want to rename the entire 'user' table to avoid the reserved-word hassle:
-- ALTER TABLE "user" RENAME TO users;
-- Then update the FK above to REFERENCES users(id).