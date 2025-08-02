import { query } from '../../../lib/db';

export async function GET() {
    const { rows } = await query('select row_number() over (order by s desc) as id, categories.name as category, cast(s as numeric) as amount from categories full join (select sum(amount) as s, category from expenses WHERE date_trunc(\'month\', transaction_date) = date_trunc(\'month\', CURRENT_DATE) group by rollup(category)) b on categories.id = b.category where s is not null');

    return Response.json(rows)
}