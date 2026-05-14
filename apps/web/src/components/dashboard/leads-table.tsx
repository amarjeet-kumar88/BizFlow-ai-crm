"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const leads = [
    { name: 'Rahul', phone: '999999999', source: 'Website', status: 'Hot', staff: 'Amit' },
    { name: 'Priya', phone: '888888888', source: 'WhatsApp', status: 'Cold', staff: 'Riya' },
    { name: 'Ankit', phone: '777777777', source: 'Facebook', status: 'Warm', staff: 'Raj' }
]

export default function LeadsTable() {
    const [search, setSearch] = useState('')
    const filtered = leads.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className='border rounded-2xl p-5'>
            <div className='flex justify-between mb-4'>
                <Input placeholder='Search lead' value={search} onChange={(e) => setSearch(e.target.value)} />
                <Button>Filter</Button>
            </div>

            <table className='w-full'>
                <thead>
                    <tr className='text-left border-b'>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Staff</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((lead, index) => (
                        <tr key={index} className='border-b h-14'>
                            <td>{lead.name}</td>
                            <td>{lead.phone}</td>
                            <td>{lead.source}</td>
                            <td>{lead.status}</td>
                            <td>{lead.staff}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}