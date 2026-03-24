import { UnstyledButton, Text } from '@mantine/core';
import { Transition } from '@mantine/core';
import { forwardRef } from 'react';

export interface NavItemProps {
  icon: React.ComponentType<{ size: number; color?: string; style?: React.CSSProperties }>;
  label: string;
  isActive: boolean;
  isNavigating?: boolean;
  onClick: () => void;
}

export const NavItem = forwardRef<HTMLButtonElement, NavItemProps>(
  ({ icon: Icon, label, isActive, isNavigating = false, onClick }, ref) => {
    return (
      <UnstyledButton
        ref={ref}
        onClick={onClick}
        disabled={isNavigating}
        className="nav-item-button"
        styles={{
          root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            height: '100%',
            padding: '10px 8px 12px',
            color: 'white',
            background: 'none',
            border: 'none',
            cursor: isNavigating ? 'not-allowed' : 'pointer',
            opacity: isNavigating ? 0.6 : 1,
            position: 'relative',
            transition: 'all 0.2s ease',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            userSelect: 'none',
            '&:active': {
              transform: isNavigating ? 'none' : 'scale(0.95)',
            },
          },
        }}
      >
        {/* 活跃状态指示器 */}
        <Transition
          mounted={isActive}
          transition="pop"
          duration={200}
          timingFunction="ease"
        >
          {(styles) => (
            <div
              className="nav-item-indicator"
              style={{
                ...styles,
                position: 'absolute',
                top: 2,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '24px',
                height: '4px',
                background: 'linear-gradient(90deg, #60A5FA 0%, #3B82F6 100%)',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.5)',
              }}
            />
          )}
        </Transition>

        {/* 图标容器 */}
        <div 
          className="nav-item-icon"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '32px',
            borderRadius: '12px',
            background: isActive 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)' 
              : 'transparent',
            transition: 'all 0.2s ease',
          }}
        >
          {isNavigating && isActive ? (
            <div style={{
              width: 24,
              height: 24,
              border: '2.5px solid rgba(255,255,255,0.3)',
              borderTopColor: 'white',
              borderRadius: '50%',
              animation: 'nav-spin 0.7s linear infinite',
            }} />
          ) : (
            <Icon 
              size={24} 
              color={isActive ? 'white' : 'rgba(255, 255, 255, 0.85)'} 
            />
          )}
        </div>

        {/* 标签文字 */}
        <Text
          className="nav-item-label"
          style={{
            fontSize: '12px',
            fontWeight: isActive ? 600 : 500,
            color: isActive ? 'white' : 'rgba(255, 255, 255, 0.85)',
            whiteSpace: 'nowrap',
            marginTop: '2px',
            letterSpacing: '0.3px',
          }}
        >
          {label}
        </Text>
      </UnstyledButton>
    );
  });
