-- Soft delete book by id
CREATE OR REPLACE FUNCTION soft_delete_book(p_id INTEGER)
RETURNS TABLE(
    success BOOLEAN,
    message TEXT,
    book_isbn BIGINT
) AS $$
DECLARE
    book_isbn BIGINT;
BEGIN
    SELECT Books.ISBN INTO book_isbn FROM Books WHERE Books.id = p_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Book with id % not found', p_id;
    END IF;
    UPDATE books SET deleted_at = NOW() WHERE id = p_id;
    RETURN QUERY SELECT true, ' has checked out successfully', book_isbn;
END;
$$ LANGUAGE plpgsql;


--hard delete
CREATE OR REPLACE FUNCTION sp_hard_delete_user(p_id INTEGER)
RETURNS TABLE(
    success BOOLEAN,
    message TEXT
) AS $$
DECLARE
    deleted_isbn VARCHAR(255);
BEGIN
    
    SELECT Books.ISBN INTO deleted_isbn FROM Books WHERE Books.id = p_id;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Guest with ID % not found', p_id;
    END IF;
    
    
    DELETE FROM Books WHERE Books.id = p_id;
    
    RETURN QUERY SELECT true,  deleted_ISBN|| ' has been permanently deleted';
END;
$$ LANGUAGE plpgsql;