import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const insertExpenseQuery = 'with category_id as ( select id from categories where name=$2) insert into expenses (name, category, transaction_date, amount) SELECT $1, id, $3, $4 from category_id returning *'
const insertCategoryQuery = 'insert into categories (name) VALUES($1)'
const getExpensesQuery = 'select  row_number() over (order by transaction_date, e.id) as id, e.name, TO_CHAR(transaction_date, \'DD-MM-YYYY\') as date, amount, c."name" as category from expenses e join categories c on e.category = c.id limit 5 offset $1'

export function query(text, params) { return pool.query(text, params); }
export function insertExpense(params) { return pool.query(insertExpenseQuery, params); }
export function insertCategory(params) { return pool.query(insertCategoryQuery, params); }
export function getExpenses(params) { return pool.query(getExpensesQuery, params); }