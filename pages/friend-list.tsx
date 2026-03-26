import dynamic from 'next/dynamic';

// 动态导入FriendList组件，避免同步加载阻塞
const FriendList = dynamic(() => import('../components/Profile/FriendList').then(m => m.FriendList), {
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

// Friend List page wrapped with layout
export default function FriendListPage() {
  return <FriendList />
}
