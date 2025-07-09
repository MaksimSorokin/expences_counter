import db from '../../../lib/db';

export default async function Home() {
  try {
    const { rows } = await db.query('SELECT * FROM categories');
    console.log(rows)
    return ('Succes')
  } catch (error) {
    console.error('Error fetching users:', error);
    return('Error fetching')
  }
}