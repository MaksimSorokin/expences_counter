import * as path from 'path'
import Excel from 'exceljs'
import { NextRequest, NextResponse } from 'next/server'

const filePath = path.resolve('public/uploads/expences.xlsx')

class Expence {
    private name: string
    private category: string
    private transaction: string
    private amount: number

    constructor(nameFull: string, transaction: string, amount: number) {
        let name: string = nameFull.split(' (')[0]
        let category: string = nameFull.split('(')[1].slice(0, -1) 
        
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
}

const getCellValue = (row: Excel.Row, cellIndex: number) => {
    const cell = row.getCell(cellIndex);

    if (typeof cell.value == 'object') {
        const value = row.getCell(cellIndex)

        return value.result ? value.result.toString() : ''
    }

    return cell.value ? cell.value.toString() : ''
}

export async function GET() {
    const workbook = new Excel.Workbook();
    const content = await workbook.xlsx.readFile(filePath);

    const worksheet = content.worksheets[0];
    const rowStartIndex = 2;
    const numberOfRows = worksheet.rowCount - 3;

    const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? []

    let expences: Expence[] = []
    
    rows.forEach((row) => {
        let cell = 2
        while (cell < worksheet.columnCount) {
            if (getCellValue(row, cell) != '') {
                expences.push(new Expence(
                    getCellValue(row, 1),
                    getCellValue(worksheet.getRow(1), cell),
                    +getCellValue(row, cell)
                ))
            }
            cell++
        }
    })

    console.log(expences)
    return NextResponse.json(expences)
}