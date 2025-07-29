"use client"
import {useState, useEffect} from 'react'

interface Category {
    id: number;
    name: string;
}

export default function Category() {
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch('api/categories')
            const categories = await res.json()
            setCategories(categories)
        }
        getCategories()
    }, [])

    return (
        <div>
            <ul className='flex items-center flex-col'>
                {categories.map(category => ( 
                    <li key={category.id}>
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}