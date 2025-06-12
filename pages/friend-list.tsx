import { FriendList } from '../components/Profile/FriendList'
import dynamic from 'next/dynamic'

// Create client-side only version of page component
const ClientFriendListPage = dynamic(
  () => Promise.resolve(() => <FriendList />),
  { ssr: false }
)

// Friend List page wrapped with layout
export default function FriendListPage() {
  return <ClientFriendListPage />
}
