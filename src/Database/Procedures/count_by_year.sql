CREATE OR REPLACE FUNCTION count_books_by_year(year INT)
RETURNS INT AS $$
BEGIN
    RETURN (SELECT COUNT(*) FROM books WHERE publication_year = year);
END;
$$ LANGUAGE plpgsql;