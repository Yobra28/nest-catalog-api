--soft delete
CREATE OR REPLACE FUNCTION soft_delete_book(p_id INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE books
  SET deleted_at = NOW()
  WHERE id = p_id AND deleted_at IS NULL;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Book with ID % not found or already deleted', p_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

--hard delete
CREATE OR REPLACE FUNCTION hard_delete_book(p_id INTEGER)
RETURNS VOID AS $$
BEGIN
  DELETE FROM books WHERE id = p_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Book with ID % not found', p_id;
  END IF;
END;
$$ LANGUAGE plpgsql;
