"use client"

import { ChangeEvent, MouseEvent, useState, useEffect } from "react"
import styles from '@/components/AddExpenseForm.module.css'

interface Category {
    id: number,
    name: string
}

export default function AddForm() {
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch("api/categories")
            const categories = await res.json()
            setCategories(categories)
            console.log(categories)
        }
        getCategories()
    }, [])
    
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [transaction, setTransaction] = useState("")
    const [amount, setAmount] = useState("")

    const Submit = async (e: MouseEvent) => {
        e.preventDefault()
        const res = await fetch('/api/expenses', {
            method: "POST",
            body: JSON.stringify([name, category, transaction, amount])
        })
        console.log(res)
    }

    const ClickCategory = (e: React.MouseEvent<HTMLElement>) => {
        setCategory(e.currentTarget.innerHTML)
        ToggleCategoriesDiv()
    }

    const ClickCategoryInput = (e: MouseEvent) => {
        ToggleCategoriesDiv()
    }

    const ToggleCategoriesDiv = () => {
        const div = document.getElementById('categoriesDiv');
        if (div) {
            div.style.display = div.style.display == 'none' ? 'flex' : 'none'
        }
    }

    return (
        <fieldset className={styles['form']}>
            <form action='#' method='get' className="flex flex-col items-center">
                <label>
                    Название
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                
                <label>
                    Категория
                </label>
                <div>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        onClick={(e) => ClickCategoryInput(e)}
                        required
                    />
                    <div
                        id='categoriesDiv' 
                        className="absolute flex-col bg-white w-fit"
                        style = {{ display: "none" }}
                        >
                        {categories.map(categorie => (
                            <a 
                                id={categorie.id.toString()}
                                key={categorie.id}
                                onClick={(e) => ClickCategory(e)}
                                >
                                    {categorie.name}
                            </a>
                        ))}
                    </div>
                </div>
                
                <label>
                    Дата 
                </label>
                <input 
                    type="date"
                    name="transaction"
                    id="transaction"
                    value={transaction}
                    onChange={(e) => setTransaction(e.target.value)}
                    required
                />

                <label>
                    Сумма
                </label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    value="Submit"
                    onClick={(e) => Submit(e)}
                >
                    Добавить
                </button>
            </form>
        </fieldset>
    )
}