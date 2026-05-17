'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LucideIcon } from 'lucide-react'

interface NavItemProps {
  href: string
  label: string
  icon: LucideIcon
  collapsed: boolean
}

export default function NavItem({ href, label, icon: Icon, collapsed }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: collapsed ? '7px 0' : '7px 10px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderRadius: 7,
        fontSize: 13,
        fontWeight: isActive ? 500 : 400,
        color: isActive ? '#ededed' : '#4d4d4d',
        background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
        textDecoration: 'none',
        transition: 'color 0.12s, background 0.12s',
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.color = '#888'
          ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.color = '#4d4d4d'
          ;(e.currentTarget as HTMLElement).style.background = 'transparent'
        }
      }}
    >
      <Icon size={15} strokeWidth={1.6} style={{ flexShrink: 0 }} />
      {!collapsed && (
        <span style={{ opacity: 1, transition: 'opacity 0.15s' }}>
          {label}
        </span>
      )}
    </Link>
  )
}