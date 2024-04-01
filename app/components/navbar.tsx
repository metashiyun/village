'use client'

import Link from "next/link";
import {usePathname} from 'next/navigation';

const navItems = [
    {
        "label": "查询区划",
        "href": "/"
    },
    {
        "label": "区划架构",
        "href": "/model"
    }
]

const Navbar = () => {
    const pathname = usePathname()

    return <nav className="text-gray-800 flex flex-row gap-2 justify-center h-full">
        {navItems.map(({href, label}) => {
            const isActive = pathname === href

            return <div key={href}
                       className={`${isActive ? "bg-gray-100" : "bg-transparent"} text-lg px-2 py-1 rounded hover:bg-gray-100 transition`}>
                <Link href={href}>
                    {label}
                </Link>
            </div>
        })}
    </nav>
}

export default Navbar