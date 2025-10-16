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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ProductStudio AI
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/pricing"
              className="text-sm font-medium text-[#71717a] hover:text-[#18181b] transition-colors"
            >
              요금제
            </Link>
            <Link
              href="/components"
              className="text-sm font-medium text-[#71717a] hover:text-[#18181b] transition-colors"
            >
              컴포넌트
            </Link>
            <a
              href="#features"
              className="text-sm font-medium text-[#71717a] hover:text-[#18181b] transition-colors"
            >
              기능
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-[#71717a] hover:text-[#18181b] transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden sm:block text-sm font-medium text-[#71717a] hover:text-[#18181b] transition-colors"
                >
                  대시보드
                </Link>
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-900">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold text-sm">
                    {getInitials(user.email || 'US')}
                  </div>
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-[#71717a] hover:text-[#18181b] transition-colors"
                >
                  로그인
                </Link>
                <Link
                  href="/pricing"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:opacity-90 transition-opacity"
                >
                  시작하기
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
