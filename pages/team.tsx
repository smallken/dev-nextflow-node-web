import dynamic from 'next/dynamic';

// 动态导入TeamTree组件，避免同步加载阻塞
const TeamTree = dynamic(() => import('../components/Profile/TeamTree').then(m => m.TeamTree), {
  ssr: false,
  loading: () => (
    <div style={{
      background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 50%, #93C5FD 100%)',
      minHeight: '100vh',
      paddingBottom: '80px'
    }}>
      <div style={{ padding: '16px', textAlign: 'center' }}>
        Loading...
      </div>
    </div>
  )
});

// Team page wrapped with layout
export default function TeamPage() {
  return <TeamTree />;
}
