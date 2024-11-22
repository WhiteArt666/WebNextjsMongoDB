"use client"
import React from 'react'
import Image from "next/image";
import { navLinks } from '@/lib/constants';
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs';
import { usePathname } from "next/navigation";


const LeftSideBar = () => {
  const pathName = usePathname();
  return (
    <div className='h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden'>
      <Image src="/verizon_btn.svg" alt="logo" width={150} height={70} />

      <div className='flex flex-col gap-12'>
        {navLinks.map((link) => (
          // Sử dụng Link của Next.js thay vì thẻ link
          <Link href={link.url} key={link.label} className={`flex gap-4 text-body-medium ${pathName === link.url ? "text-blue-1" : "text-grey-1"}`}>
            {link.icon} 
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className='flex gap-4 text-body-medium item-center'>
        <UserButton/>
        <p>Edit Profile</p>
      </div>
    </div>
  )
}

export default LeftSideBar;
