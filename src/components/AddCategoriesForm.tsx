"use client"
import { useState, MouseEvent } from 'react'

export default function AddForm() {
    const [name, setName] = useState('');

    const Submit = async (e: MouseEvent) => {
        e.preventDefault()
        const res = await fetch('/api/categories', {
            method: "POST", 
            body: JSON.stringify([name])
        })
        setName("")
    }

    return (
        <fieldset className='ml-auto mr-auto mt-10 w-fit'>
            <form action='#' method='get' className='flex flex-col items-center bg-[#95e9ff4f]'>
                <input 
                    type='text'
                    name='name'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value.toLowerCase())}
                    required
                    autoComplete='off'
                    className='w-auto text-center'
                />

                <button 
                    type='submit'
                    value='Submit'
                    onClick={(e) => Submit(e)}
                >
                    Добавить новую категорию
                </button>
            </form>
        </fieldset>
    )
}