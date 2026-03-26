console.log(`[chunk:home] loaded t=${performance.now().toFixed(0)}ms`);
import dynamic from 'next/dynamic';

// 动态导入Home组件，避免同步加载阻塞
const Home = dynamic(() => import('../components/Home/Home').then(m => m.Home), {
  ssr: false,
  loading: () => (
    <div style={{
      background: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 50%, #93C5FD 100%)',
      minHeight: '100vh'
    }}>
      <div style={{ padding: '16px', textAlign: 'center' }}>
        Loading...
      </div>
    </div>
  )
});

export default Home;