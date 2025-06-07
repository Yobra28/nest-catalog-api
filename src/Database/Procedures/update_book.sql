CREATE OR REPLACE FUNCTION update_book(
    p_id INTEGER,
    p_title VARCHAR(255),
    p_author VARCHAR(255),
    p_publication_year INTEGER,
    p_ISBN BIGINT
)
RETURNS TABLE(
    id INTEGER,
    title VARCHAR(255),
    author VARCHAR(255),
    publication_year INTEGER,
    ISBN BIGINT
) AS $$
DECLARE
    current_ISBN BIGINT;
BEGIN
    SELECT Books.ISBN INTO current_ISBN FROM Books WHERE Books.id = p_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'book with id % not found', p_id;
    END IF;

    IF p_ISBN IS NOT NULL AND p_ISBN != current_ISBN THEN
        IF EXISTS (SELECT 1 FROM Books WHERE Books.ISBN = p_ISBN AND Books.id != p_id) THEN
            RAISE EXCEPTION 'Another book with this ISBN exists';
        END IF;
    END IF;

    RETURN QUERY
    UPDATE Books SET
        title = COALESCE(p_title, Books.title),
        author = COALESCE(p_author, Books.author),
        publication_year = COALESCE(p_publication_year, Books.publication_year),
        ISBN = COALESCE(p_ISBN, Books.ISBN)
    WHERE Books.id = p_id
    RETURNING Books.id, Books.title, Books.author, Books.publication_year, Books.ISBN;
END;
$$ LANGUAGE plpgsql;
