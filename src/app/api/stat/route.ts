import db from '../../../lib/db';

export async function GET() {
    const { rows } = await db.query('select row_number() over (order by s desc) as id, categories.name as category, cast(s as numeric) as amount from categories full join (select sum(amount) as s, category from expenses group by rollup(category)) b on categories.id = b.category');
    
    return Response.json(rows)
}