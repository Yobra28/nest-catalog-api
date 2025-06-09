CREATE OR REPLACE FUNCTION create_book(
    p_title VARCHAR,
    p_author VARCHAR,
    p_publication_year INTEGER,
    p_ISBN BIGINT
)
RETURNS TABLE(
    id INTEGER,
    title VARCHAR,
    author VARCHAR,
    publication_year INTEGER,
    ISBN BIGINT
) AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM books WHERE ISBN = p_ISBN) THEN
        RAISE EXCEPTION 'Book with ISBN % already exists', p_ISBN;
    END IF;

    RETURN QUERY
    INSERT INTO books (title, author, publication_year, ISBN)
    VALUES (p_title, p_author, p_publication_year, p_ISBN)
    RETURNING id, title, author, publication_year, ISBN;
END;
$$ LANGUAGE plpgsql;



