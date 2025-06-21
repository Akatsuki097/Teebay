ALTER TABLE product
  ADD COLUMN buyer_id INTEGER;

ALTER TABLE product
  ADD CONSTRAINT fk_products_buyer
    FOREIGN KEY (buyer_id)
    REFERENCES "user"(id);


ALTER TABLE product
  ADD COLUMN renter_id INTEGER;

ALTER TABLE product
  ADD CONSTRAINT fk_products_renter
    FOREIGN KEY (renter_id)
    REFERENCES "user"(id);