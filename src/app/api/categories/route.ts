import db from '../../../lib/db';
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const { rows } = await db.query('SELECT * FROM categories');
  return Response.json(rows)
}