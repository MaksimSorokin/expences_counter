import db from '../../../lib/db';
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const { rows } = await db.query('SELECT * FROM categories');
  return Response.json(rows)
}

export async function POST(request: NextRequest) {
  const category = await request.json()

  const res = await db.insertCategory(category)

  if (res) {
    return NextResponse.json({status: 200})
  } else {
    return NextResponse.json({status: 500})
  }
}