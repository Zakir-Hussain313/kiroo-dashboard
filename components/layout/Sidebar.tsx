'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Send,
  FileText,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  X,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import NavItem from './NavItem'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/leads', label: 'Leads', icon: Users },
  { href: '/dashboard/outreach', label: 'Outreach', icon: Send },
  { href: '/dashboard/proposals', label: 'Proposals', icon: FileText },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

interface SidebarProps {
  mobileOpen: boolean
  onMobileClose: () => void
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('sidebar-collapsed') === 'true'
  })

  function toggleCollapse() {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('sidebar-collapsed', String(next))
  }

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const sidebarWidth = collapsed ? 56 : 240

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 40,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: sidebarWidth,
          background: '#0d0d0d',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.2s cubic-bezier(0.16,1,0.3,1), transform 0.25s cubic-bezier(0.16,1,0.3,1)',
          zIndex: 50,
          overflow: 'hidden',
          // Mobile: slide in/out
          transform: `translateX(${mobileOpen ? 0 : '-100%'})`,
        }}
        // On desktop override transform
        className="sidebar-desktop"
      >
        <style>{`
          @media (min-width: 768px) {
            .sidebar-desktop {
              transform: translateX(0) !important;
            }
          }
        `}</style>

        {/* Top — Logo + close button on mobile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: collapsed ? '20px 0' : '20px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          minHeight: 60,
        }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 26, height: 26,
                borderRadius: 7,
                background: '#4f8ef7',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 600, color: 'white', flexShrink: 0,
              }}>K</div>
              <span style={{ fontSize: 14, fontWeight: 500, color: '#ededed', letterSpacing: '-0.2px' }}>
                Kiroo
              </span>
            </div>
          )}

          {collapsed && (
            <div style={{
              width: 26, height: 26,
              borderRadius: 7,
              background: '#4f8ef7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 600, color: 'white',
            }}>K</div>
          )}

          {/* Mobile close */}
          {!collapsed && (
            <button
              onClick={onMobileClose}
              className="mobile-only"
              style={{
                background: 'none', border: 'none',
                color: '#555', cursor: 'pointer',
                display: 'none', padding: 4,
              }}
            >
              <X size={16} />
            </button>
          )}
          <style>{`
            @media (max-width: 767px) { .mobile-only { display: flex !important; } }
          `}</style>
        </div>

        {/* Nav */}
        <nav style={{
          flex: 1,
          padding: collapsed ? '16px 8px' : '16px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflowY: 'auto',
        }}>
          {navItems.map(item => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              collapsed={collapsed}
            />
          ))}
        </nav>

        {/* Bottom — sign out + collapse toggle */}
        <div style={{
          padding: collapsed ? '16px 8px' : '16px 10px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
          {/* Sign out */}
          <button
            onClick={handleSignOut}
            title={collapsed ? 'Sign out' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: collapsed ? '8px 0' : '8px 10px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              color: '#444',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              transition: 'color 0.15s',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#999')}
            onMouseLeave={e => (e.currentTarget.style.color = '#444')}
          >
            <LogOut size={16} strokeWidth={1.8} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Sign out</span>}
          </button>

          {/* Collapse toggle — desktop only */}
          <button
            onClick={toggleCollapse}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="desktop-only"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: 10,
              padding: collapsed ? '8px 0' : '8px 10px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              color: '#444',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              transition: 'color 0.15s',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#999')}
            onMouseLeave={e => (e.currentTarget.style.color = '#444')}
          >
            {collapsed ? (
              <ChevronsRight size={16} strokeWidth={1.8} style={{ flexShrink: 0 }} />
            ) : (
              <>
                <ChevronsLeft size={16} strokeWidth={1.8} style={{ flexShrink: 0 }} />
                <span>Collapse</span>
              </>
            )}
          </button>
          <style>{`
            @media (min-width: 768px) { .desktop-only { display: flex !important; } }
          `}</style>
        </div>
      </aside>
    </>
  )
}