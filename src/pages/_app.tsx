import Layout from '@/components/Layout'
import LoginWrapper from '@/components/LoginWrapper'
import { AuthProvider } from '@/context/AuthContext'
import '@/styles/globals.css'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <AuthProvider>
        <LoginWrapper>
          <Component {...pageProps} />
        </LoginWrapper>
      </AuthProvider>
    </Layout>
  )
}
