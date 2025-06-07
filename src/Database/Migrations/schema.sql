--Books Table
CREATE TABLE IF NOT EXISTS Books(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publication_year INTEGER NOT NULL,
    ISBN BIGINT NOT NULL
);

--Index of title on books table 
CREATE INDEX IF NOT EXISTS idx_books_title ON Books(title);

--Inserted data
INSERT INTO Books (title, author, publication_year, ISBN) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 9780743273565),
('1984', 'George Orwell', 1949, 9780451524935),
('To Kill a Mockingbird', 'Harper Lee', 1960, 9780060935467),
('Pride and Prejudice', 'Jane Austen', 1813, 9780141040349),
('The Hobbit', 'J.R.R. Tolkien', 1937, 9780547928227);

