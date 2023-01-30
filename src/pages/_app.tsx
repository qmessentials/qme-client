import Layout from '@/components/layout/Layout'
import LoginWrapper from '@/components/auth/LoginWrapper'
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
