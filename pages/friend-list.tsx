import { FriendList } from '../components/Friends/FriendList'
import Layout from '../components/Layout/Layout'

// Friend List page wrapped with layout
export default function FriendListPage() {
  return (
    <Layout>
      <FriendList />
    </Layout>
  )
}
