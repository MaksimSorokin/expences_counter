"use client"

import { MouseEvent } from "react"

export default function StatModule() {

    const getStatistic = async (e: MouseEvent<HTMLButtonElement>) => {
        
        try {
            const res = await fetch("api/stat")
            const stat = await res.json()
            const statLabel = document.getElementById('StatLabel')
            statLabel.style.display = 'block'
            statLabel.innerHTML += ' ' + stat[0].sum 
        } catch (error) {
            console.error('Error while fetching db data', error)
        }
    }

    return (
        <div className="flex items-center flex-col">
            <button
            onClick={getStatistic}>
                Сформировать
            </button>
            <label id="StatLabel">
                Сумма трат =
            </label>
        </div>
    )
}