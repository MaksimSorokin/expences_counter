const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const insertExpenseQuery = 'with category_id as ( select id from categories where name=$2) insert into expenses (name, category, transaction_date, amount) SELECT $1, id, $3, $4 from category_id returning *'

module.exports = {
  query: (text, params) => pool.query(text, params),
  insertExpense: (params) => pool.query(insertExpenseQuery, params)
};