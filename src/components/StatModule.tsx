"use client"

import { MouseEvent } from "react"

export default function StatModule() {

    const getStatistic = async (e: MouseEvent<HTMLButtonElement>) => {
        
        let stat = []
        try {
            const res = await fetch("api/stat")
            console.log(res.body)
        } catch (error) {
            console.error('Error while fetching db data', error)
        }
    }

    return (
        <button
        onClick={getStatistic}>
            Сформировать
        </button>
    )
}