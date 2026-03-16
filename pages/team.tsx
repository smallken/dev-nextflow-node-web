import { TeamTree } from '../components/Profile/TeamTree';
import dynamic from 'next/dynamic';

// Create client-side only version of page component
const ClientTeamPage = dynamic(
  () => Promise.resolve(() => <TeamTree />),
  { ssr: false }
);

// Team page wrapped with layout
export default function TeamPage() {
  return <ClientTeamPage />;
}
