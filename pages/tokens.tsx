console.log(`[chunk:tokens] loaded t=${performance.now().toFixed(0)}ms`);
import dynamic from 'next/dynamic';

// 动态导入Tokens组件，避免同步加载阻塞
const Tokens = dynamic(() => import('../components/Tokens/Tokens').then(m => m.Tokens), {
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

export default Tokens;
