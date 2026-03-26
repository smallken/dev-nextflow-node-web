console.log(`[chunk:profile] loaded t=${performance.now().toFixed(0)}ms`);
import dynamic from 'next/dynamic';

// 动态导入Profile组件，避免同步加载阻塞
const Profile = dynamic(() => import('../components/Profile/Profile').then(m => m.Profile), {
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

export default Profile;