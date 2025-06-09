#!/bin/bash

echo " Setting up Hotel Management DB....."

# Create Database
psql -U postgres -h localhost -c "CREATE DATABASE book_catalog;"

# Run migrations 
psql -U postgres -h localhost -d book_catalog -f src/Database/Migrations/schema.sql

# CREATE stored Procedures
psql -U postgres -h localhost -d book_catalog -f src/Database/Procedures/create_book.sql
psql -U postgres -h localhost -d book_catalog -f src/Database/Procedures/get_book.sql
psql -U postgres -h localhost -d book_catalog -f src/Database/Procedures/update_book.sql
psql -U postgres -h localhost -d book_catalog -f src/Database/Procedures/delete_book.sql
psql -U postgres -h localhost -d book_catalog -f src/Database/Procedures/count_by_year.sql



echo "DATABASE setup complete..."

echo " You can now run : npm run start:dev"