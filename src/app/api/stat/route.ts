import { NextRequest, NextResponse } from 'next/server'
import db from '../../../lib/db';

export async function GET() {
    const { stat } = await db.query('SELECT * FROM categories');

    console.log(stat)

    return NextResponse.json(
        {status: 200}
    )
}