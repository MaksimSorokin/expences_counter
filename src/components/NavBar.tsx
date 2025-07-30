import Image from 'next/image'
import Link from 'next/link'

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
                <Link href="/" className="w-auto h-[100px] text-center leading-[100px]">Добавление</Link>
                <Link href="/stat" className="w-auto h-[100px] text-center leading-[100px]">Статистика</Link>
                <Link href="/expenses" className="w-auto h-[100px] text-center leading-[100px]">Расходы</Link>
                <Link href="/categories" className="w-auto h-[100px] text-center leading-[100px]">Категории</Link>
            </div>
        </div>
    )
}