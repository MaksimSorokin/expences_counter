import db from '../../../lib/db';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const expense = await request.json();

    const res = await db.insertExpense(expense)

    if (res) {
        return NextResponse.json({status: 200})
    } else {
        return NextResponse.json({status: 500})
    }
}