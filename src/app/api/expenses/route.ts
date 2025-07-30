import { getExpenses, insertExpense } from '../../../lib/db';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    //const page = await request.json()
    //console.log(page)

    const res = await getExpenses([0])
    //const rows = await db.getExpenses(5 * (number - 1))

    if (res) {
        return NextResponse.json(res.rows)
    } else {
        return NextResponse.json({status: 500})
    }
}

export async function POST(request: NextRequest) {
    const expense = await request.json();

    const res = await insertExpense(expense)

    if (res) {
        return NextResponse.json(res.rows[0])
    } else {
        return NextResponse.json({status: 500})
    }
}