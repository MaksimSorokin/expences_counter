"use client"
import { useState, useEffect } from 'react'

interface Expense {
    id: number;
    category: string;
    amount: string;
}

export default function Stat() {
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [sum, setSum] = useState(0);
    
    useEffect(() => {
        const getData = async () => {
            const res = await fetch("api/stat")
            const expenses = await res.json()
            const sum = expenses.shift()
            setExpenses(expenses)
            setSum(sum.amount)
            console.log(expenses)
        }
        getData()
    }, [])

    return (
        <div className='flex items-center flex-col'>
            <h2>Список расходов по категориям</h2>
            <ul className='flex items-center flex-col'>
            {expenses.map(expense => (
                <li key={expense.id}>
                    {expense.category} - {expense.amount}
                </li>
            ))}
            </ul>
            <label>
                {sum}
            </label>
        </div>
    )
}