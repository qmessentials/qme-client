import Head from 'next/head'
import { ReactNode } from 'react'
import Content from './Content'
import Nav from './Nav'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <main>
        <Nav image={{ src: '/qmessentials-logo.svg', alt: 'QMEssentials logo', width: 80, height: 80 }} bannerText="QMEssentials" />
        <Content>{children}</Content>
      </main>
    </>
  )
}
