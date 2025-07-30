import * as path from 'path'
import Excel from 'exceljs'
import { NextRequest, NextResponse } from 'next/server'
import { query } from '../../../lib/db'

const filePath = path.resolve('public/uploads/expenses.xlsx')

class Expence {
    private name: string
    private category: string
    private transaction: string
    private amount: number

    constructor(nameFull: string, transaction: string, amount: number) {
        const name: string = nameFull.split(' (')[0]
        const category: string = nameFull.split('(')[1].slice(0, -1) 
        
        this.name = name
        this.category = category
        this.transaction = transaction
        this.amount = amount
    }
    
    toString () {
        return this.name + ' ' + this.category + ' ' + this.transaction + ' ' + this.amount + '\n'
    }

    toJSON() {
        return {
            name: this.name,
            category: this.category,
            transaction: this.transaction,
            amount: this.amount
        }
    }

    toArray() {
        return [this.name, this.category, this.transaction, this.amount]
    }
}

const getCellValue = (row: Excel.Row, cellIndex: number) => {
    const cell = row.getCell(cellIndex);

    if (cell.result) {
        const value = row.getCell(cellIndex)
        return value.result ? value.result.toString() : ''
    } else {
        return cell.value ? cell.value.toString() : ''
      }
}

const transfromDate = (value: string) => {
    const date = new Date(value)

    return date.toISOString().slice(0, 10)
}

export async function GET() {
    const workbook = new Excel.Workbook();
    const content = await workbook.xlsx.readFile(filePath);

    const worksheet = content.worksheets[0];
    const rowStartIndex = 2;
    const numberOfRows = worksheet.rowCount - 2;
    console.log(numberOfRows)

    const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? []
    
    rows.forEach(async (row) => {
        let cell = 2
        while (cell < worksheet.columnCount) {
            const value = getCellValue(row, cell)
            if (value != '') {
                const expense = new Expence(
                    getCellValue(row, 1),
                    transfromDate(getCellValue(worksheet.getRow(1), cell)),
                    +value)
                
                await query('with category_id as ( select id from categories where name=$2) insert into expenses (name, category, transaction_date, amount) SELECT $1, id, $3, $4 from category_id', expense.toArray())
            }
            cell++
        }
    })

    return NextResponse.json({status: 200})
}