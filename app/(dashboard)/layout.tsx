import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import '../globals.css'
import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";
import { ToasterProvider } from "@/lib/ToasterProvider";

export const metadata: Metadata = {
  title: "Borcella - Admin Dasboard",
  description: "Admin Dashboard to manege Borcella's data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ToasterProvider/>
          <div className="flex max-lg:flex-col text-grey-1">
          <LeftSideBar/>
          <TopBar/>
          <div className="flex-1">{children}</div>
          </div>
        
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
         
          
        </body>
      </html>
    </ClerkProvider>
  )
}