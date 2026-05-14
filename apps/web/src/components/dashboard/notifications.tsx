const notifications = [
    'New lead arrived',
    'Campaign completed',
    'Payment received',
    'AI generated insights'
]

export default function Notifications() {
    return (
        <div className='rounded-2xl border p-5'>
            <h2 className='font-bold mb-4'>Recent Activity</h2>

            <div className='space-y-4'>
                {notifications.map((item, index) => (
                    <div key={index} className='border-b pb-3'>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}