"use client"

export default function StatModule() {
    const handleClick = () => {
        window.location.href = "/stat"
    }
    return (
        <div className="flex items-center flex-col">
            <button
            onClick={handleClick}>
                Сформировать
            </button>
        </div>
    )
}