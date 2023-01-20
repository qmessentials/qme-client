import Head from 'next/head'
import { ReactNode } from 'react'
import Content from './Content'
import Nav from './Nav'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>QMEssentials</title>
        <meta name="description" content="Quality management software" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Nav image={{ src: '/qmessentials-logo.svg', alt: 'QMEssentials logo', width: 80, height: 80 }} bannerText="QM Essentials" />
        <Content>{children}</Content>
      </main>
    </>
  )
}
