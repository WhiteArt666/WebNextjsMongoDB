"use client"
import { navLinks } from "@/lib/constants"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import Image from "next/image";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathName = usePathname();

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
      <Image src="/logo.png" alt="logo" width={150} height={70} />

      <div className='flex gap-8 max-md:hidden'>
        {navLinks.map((link) => (
          // Sử dụng Link của Next.js thay vì thẻ link
          <Link href={link.url} key={link.label} className={`flex gap-4 text-body-medium ${pathName === link.url ? "text-blue-1" : "text-grey-1"}`}>
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className='relative flex gap-4 items-center'>
        <Menu className="cursor-pointer md:hidden" onClick={() => setDropdownMenu(!dropdownMenu)}/>
          {dropdownMenu && (
            <div className='absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-x1 rounded-lg'>
            {navLinks.map((link) => (
              // Sử dụng Link của Next.js thay vì thẻ link
              <Link href={link.url} key={link.label} className='flex gap-4 text-body-medium'>
                {link.icon} 
                <p>{link.label}</p>
              </Link>
            ))}
          </div>
          )}
        <UserButton />
      </div>
    </div>
  )
}

export default TopBar
