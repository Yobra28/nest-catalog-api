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
    RETURN QUERY
    INSERT INTO books (title, author, publication_year, ISBN)
    VALUES (p_title, p_author, p_publication_year, p_ISBN)
    RETURNING id, title, author, publication_year, ISBN;
END;
$$ LANGUAGE plpgsql;


    -- Count books by publication year
CREATE OR REPLACE FUNCTION count_books_by_year(year INT)
RETURNS INT AS $$
BEGIN
    RETURN (SELECT COUNT(*) FROM books WHERE publication_year = year AND deleted_at IS NULL);
END;
$$ LANGUAGE plpgsql;