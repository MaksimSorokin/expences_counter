"use client"

import { useState, useEffect, MouseEvent } from "react"
import { useParams } from "next/navigation";

interface Expense {
    id: number;
    name: string;
    date: string;
    category: string;
    amount: number
}

export default function ExpensesTable() {
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [page, setPage] = useState(0)

    const getData = async () => {
            const res = await fetch(`api/expenses/${page}`)
            const expenses = await res.json()
            setExpenses(expenses)
            console.log(expenses)
        }

    useEffect(() => {
        getData()
    }, [page])

    const Next = async (e: MouseEvent) => {
        
        setPage(page + 1)
    }

    return (
        <div className='ml-auto mr-auto w-fit'>
            <table className='flex flex-col'>
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Дата</th>
                        <th>Категория</th>
                        <th>Сумма</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense.id}>
                            <td>{expense.name}</td>
                            <td>{expense.date}</td>
                            <td>{expense.category}</td>
                            <td>{expense.amount}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <button
                type="button"
                value="Next"
                onClick={(e) => Next(e)}
            >
                Дальше
            </button>
        </div>
    )
}