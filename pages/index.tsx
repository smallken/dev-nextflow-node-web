import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle'
import { Welcome } from '../components/Welcome/Welcome'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function HomePage () {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 12
        }}
      >
        <ConnectButton />
      </div>
      <Welcome />
      <ColorSchemeToggle />
    </>
  )
}
