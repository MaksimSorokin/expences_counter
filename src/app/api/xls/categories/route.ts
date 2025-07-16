import * as path from 'path'
import Excel from 'exceljs'
import { NextRequest, NextResponse } from 'next/server'
import db from '../../../../lib/db'

const filePath = path.resolve('public/uploads/expences.xlsx')

const getCellValue = (row: Excel.Row, cellIndex: number) => {
    const cell = row.getCell(cellIndex);

    return cell.value ? cell.value.toString() : ''
}

export async function GET() {
    const workbook = new Excel.Workbook();
    const content = await workbook.xlsx.readFile(filePath);

    const worksheet = content.worksheets[0];
    const rowStartIndex = 2;
    const numberOfRows = worksheet.rowCount - 3;

    const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? []

    const categories: Set<string> = new Set()
    
    rows.forEach((row) => {
        const cell = row.getCell(1)
        if (cell.value) {
            categories.add(cell.value.toString().split('(')[1].slice(0, -1))
        }
    })

    categories.forEach(async (categorie) => {
        const text = 'INSERT INTO categories (name) VALUES (\'' + categorie + '\') RETURNING *'
        const res = await db.query(text)
        console.log(res.rows[0])
    })
    console.log(categories)
    return NextResponse.json(categories)
}