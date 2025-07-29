import Image from 'next/image'

export default function Nav() {
    return (
        <div className="flex flex-row justify-between items-center bg-[#95e9ff]">
            <Image
                src={"/images/main.jpeg"}
                alt="main"
                width={100}
                height={100}
                priority={true}
                className='rounded-full'
                />
            <div
            className="flex justify-between mr-10 w-100">
                <a href="/" className="w-auto h-[100px] text-center leading-[100px]">Добавление</a>
                <a href="/stat" className="w-auto h-[100px] text-center leading-[100px]">Статистика</a>
                <a href="/categories" className="w-auto h-[100px] text-center leading-[100px]">Категории</a>
            </div>
        </div>
    )
}