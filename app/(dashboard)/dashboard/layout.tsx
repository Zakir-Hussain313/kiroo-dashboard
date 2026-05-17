'use client'

import { useState } from 'react'
import TopBar from '@/components/layout/TopBar'
import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [sidebarWidth, setSidebarWidth] = useState(() => {
        if (typeof window === 'undefined') return 240
        return localStorage.getItem('sidebar-collapsed') === 'true' ? 56 : 240
    })

    return (
        <div style={{ minHeight: '100vh', background: '#0d0d0d', fontFamily: 'Inter, sans-serif' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0d0d0d; -webkit-font-smoothing: antialiased; }
      `}</style>

            <Sidebar
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />

            <TopBar
                onMenuClick={() => setMobileOpen(true)}
                sidebarWidth={sidebarWidth}
            />

            {/* Page content */}
            <main style={{
                marginLeft: sidebarWidth,
                paddingTop: 52,
                minHeight: '100vh',
                transition: 'margin-left 0.2s cubic-bezier(0.16,1,0.3,1)',
            }}
                className="dashboard-main"
            >
                <style>{`
          @media (max-width: 767px) {
            .dashboard-main { margin-left: 0 !important; }
          }
        `}</style>
                <div style={{ padding: '32px 32px' }}>
                    {children}
                </div>
            </main>
        </div>
    )
}