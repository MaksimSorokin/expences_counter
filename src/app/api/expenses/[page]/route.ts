import { getExpenses } from '../../../../lib/db';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, {params}: {params: Promise<{ page: string}>}) {
    //const page = await request.json()
    //console.log(page)
    
    const { page } = await params
    
    const res = await getExpenses([5 * Number(page)])

    if (res) {
        return NextResponse.json(res.rows)
    } else {
        return NextResponse.json({status: 500})
    }
}