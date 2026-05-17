'use client'

import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface TopBarProps {
  onMenuClick: () => void
  sidebarWidth: number
}

const pageTitles: Record<string, string> = {
  '/dashboard':            'Overview',
  '/dashboard/leads':      'Leads',
  '/dashboard/outreach':   'Outreach',
  '/dashboard/proposals':  'Proposals',
  '/dashboard/settings':   'Settings',
}

export default function TopBar({ onMenuClick, sidebarWidth }: TopBarProps) {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? 'Dashboard'

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: sidebarWidth,
      right: 0,
      height: 52,
      background: '#0d0d0d',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 16,
      zIndex: 30,
      transition: 'left 0.2s cubic-bezier(0.16,1,0.3,1)',
    }}>

      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="hamburger"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: '#555',
          cursor: 'pointer',
          padding: 4,
          borderRadius: 6,
        }}
      >
        <Menu size={18} />
      </button>
      <style>{`
        @media (max-width: 767px) {
          .hamburger { display: flex !important; }
        }
      `}</style>

      {/* Page title */}
      <span style={{
        fontSize: 14,
        fontWeight: 500,
        color: '#ededed',
        letterSpacing: '-0.2px',
      }}>
        {title}
      </span>

    </header>
  )
}