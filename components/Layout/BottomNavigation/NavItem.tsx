import { UnstyledButton, Text } from '@mantine/core';
import { Transition } from '@mantine/core';
import { forwardRef } from 'react';

export interface NavItemProps {
  icon: React.ComponentType<{ size: number; color?: string; style?: React.CSSProperties }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const NavItem = forwardRef<HTMLButtonElement, NavItemProps>(
  ({ icon: Icon, label, isActive, onClick }, ref) => {
    return (
      <UnstyledButton
        ref={ref}
        onClick={onClick}
        className="nav-item-button"
        styles={{
          root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            height: '100%',
            padding: '8px',
            color: 'white',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1)',
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
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '40px',
                height: '3px',
                background: 'white',
                borderRadius: '0 0 3px 3px',
              }}
            />
          )}
        </Transition>

        {/* 图标 */}
        <div className="nav-item-icon">
          <Icon size={20} color={isActive ? 'white' : 'rgba(255, 255, 255, 0.7)'} />
        </div>

        {/* 标签文字 */}
        <Text
          size="xs"
          className="nav-item-label"
          style={{
            fontSize: '10px',
            fontWeight: isActive ? 600 : 400,
            color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </Text>
      </UnstyledButton>
    );
});
