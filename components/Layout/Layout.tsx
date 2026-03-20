// import { ConnectButton } from '@rainbow-me/rainbowkit'
import CustomConnectButton from './CustomConnectButton'
import { AppShell, Burger, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'
import Navbar from './Navbar'
import LanguageSwitcher from './LanguageSwitcher'
import { BottomNavigation } from './BottomNavigation'
import { useState, useEffect, useCallback } from 'react'

export function Layout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

  // 移动端检测 - 使用 matchMedia 更可靠
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  const checkMobile = useCallback(() => {
    // 优先使用 matchMedia（更可靠）
    if (typeof window !== 'undefined') {
      const mobile = window.matchMedia('(max-width: 767px)').matches
      setIsMobile(mobile)
      if (process.env.NODE_ENV !== 'production') {
        console.log('检测到移动端:', mobile, '窗口宽度:', window.innerWidth)
      }
    }
  }, [])

  useEffect(() => {
    // 标记组件已挂载，避免 SSR hydration 错误
    setMounted(true)
    // 初始检测
    checkMobile()

    // 监听媒体查询变化
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const handler = (e: MediaQueryListEvent) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('媒体查询变化:', e.matches)
      }
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener('change', handler)

    // 也监听 resize 作为备用
    window.addEventListener('resize', checkMobile)

    return () => {
      mediaQuery.removeEventListener('change', handler)
      window.removeEventListener('resize', checkMobile)
    }
  }, [checkMobile])

  // 获取slogan：中文显示"智科技，链未来"，英文显示"Smart Tech, Link Future"
  const slogan = i18n.language === 'zh' ? '智科技，链未来' : 'Smart Tech, Link Future'

  return (
    <AppShell
      header={{ height: isMobile ? 50 : 60 }}
      navbar={!mounted || isMobile ? undefined : {
        width: { sm: 150, lg: 200 },
        breakpoint: 'sm',
        collapsed: { mobile: true, desktop: !desktopOpened }
      }}
      padding='0'
      styles={{
        main: {
          paddingBottom: isMobile ? '70px' : '0',
        }
      }}
    >
      <AppShell.Header>
        <Group
          h='100%'
          px={isMobile ? 'xs' : 'md'}
          justify='space-between'
          gap={isMobile ? 'xs' : 'xs'}
          style={{ flexWrap: 'nowrap' }}
        >
          {/* Logo区域 */}
          <Group gap={isMobile ? 'xs' : 'md'} style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', flex: 1 }}>
            {/* 桌面端显示Burger按钮，移动端隐藏 */}
            {!isMobile && (
              <Burger
                opened={desktopOpened}
                onClick={toggleDesktop}
                size='sm'
              />
            )}
            <img src="/logo-black.png" style={{ height: isMobile ? '24px' : '28px', width: 'auto' }} alt="NextFlow Logo" />
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: isMobile ? '80px' : '100px' }}>
              <img src="/logo-black-word.png" style={{ height: isMobile ? '16px' : '18px', width: 'auto', objectFit: 'contain', objectPosition: 'left', marginBottom: '1px' }} alt="NextFlow" />
              {!isMobile && (
                <span style={{ fontSize: '9px', color: '#64748b', fontWeight: 500, letterSpacing: '0.5px', whiteSpace: 'nowrap', lineHeight: 1 }}>
                  {slogan}
                </span>
              )}
            </div>
          </Group>

          {/* 右侧按钮组 */}
          <Group gap="xs" style={{ flexWrap: 'nowrap', flexShrink: 0 }}>
            <CustomConnectButton />
            <LanguageSwitcher />
          </Group>
        </Group>
      </AppShell.Header>

      {/* 桌面端显示左侧导航栏 */}
      {mounted && !isMobile && <Navbar />}

      <AppShell.Main>
        {children}
      </AppShell.Main>

      {/* 移动端显示底部导航栏 */}
      {mounted && isMobile && <BottomNavigation />}
    </AppShell>
  )
}


export default Layout
