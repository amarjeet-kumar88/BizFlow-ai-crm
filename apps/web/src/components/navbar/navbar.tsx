"use client"

import ThemeToggle from './theme-toggle'
import { Bell } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export default function Navbar() {
    return (
        <div className='sticky top-0 z-40 bg-background border-b p-4 flex justify-between items-center'>

            <Input
                placeholder='Search leads, customers...'
                className='max-w-sm'
            />

            <div className='flex items-center gap-4'>
                <ThemeToggle />
                <Bell className='cursor-pointer' />

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <img
                            src='https://i.pravatar.cc/40'
                            className='rounded-full h-10 w-10 cursor-pointer'
                        />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>

                </DropdownMenu>
            </div>
        </div>
    )
}