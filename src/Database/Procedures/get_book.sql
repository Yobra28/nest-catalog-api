-- Get all books
CREATE OR REPLACE FUNCTION get_all_books()
RETURNS SETOF Books AS $$
BEGIN
    RETURN QUERY SELECT * FROM Books ORDER BY id;
END;
$$ LANGUAGE plpgsql;

-- Get one book by id
CREATE OR REPLACE FUNCTION get_book_by_id(p_id INTEGER)
RETURNS SETOF Books AS $$
BEGIN
    RETURN QUERY SELECT * FROM Books WHERE id = p_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION ' Book with id % not found', p_id;
    END IF;
END;
$$ LANGUAGE plpgsql;