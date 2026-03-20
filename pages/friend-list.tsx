import dynamic from 'next/dynamic'

// Create client-side only version of page component
const FriendList = dynamic(
  () => import('../components/Profile/FriendList').then(mod => mod.FriendList),
  { ssr: false }
)

// Friend List page wrapped with layout
export default function FriendListPage() {
  return <FriendList />
}
