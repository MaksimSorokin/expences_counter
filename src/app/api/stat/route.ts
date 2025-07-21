import db from '../../../lib/db';

export async function GET() {
    const { rows } = await db.query('SELECT sum(amount) FROM expenses');
    
    return Response.json(rows)
}