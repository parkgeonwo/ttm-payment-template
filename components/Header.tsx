'use client'

import Link from 'next/link'
import type { User } from '@supabase/supabase-js'

interface HeaderProps {
  user: User | null
  onLogout: () => void
}

export default function Header({ user, onLogout }: HeaderProps) {
  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 bg-[#0f1011]/80 backdrop-blur-lg border-b border-[#23252a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-[17px] font-semibold text-[#f7f8f8] tracking-[-0.022em]">
              Selloframe
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/pricing"
              className="text-[13px] font-medium text-[#8a8f98] hover:text-[#f7f8f8] transition-colors"
            >
              요금제
            </Link>
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden sm:block text-[13px] font-medium text-[#8a8f98] hover:text-[#f7f8f8] transition-colors"
                >
                  대시보드
                </Link>
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[13px] font-medium text-[#f7f8f8]">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                  <span className="text-[11px] text-[#8a8f98]">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5e6ad2] to-[#7170ff] flex items-center justify-center text-white font-semibold text-[13px]">
                    {getInitials(user.email || 'US')}
                  </div>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 text-[13px] font-medium text-[#eb5757] hover:text-[#f7f8f8] hover:bg-[#2e1a1a] rounded-lg transition-colors"
                  >
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-[13px] font-medium text-white bg-[#5e6ad2] hover:bg-[#4e5bc2] rounded-lg transition-colors"
              >
                시작하기
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
