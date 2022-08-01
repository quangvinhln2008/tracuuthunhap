import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LayoutApp from '../components/Layout'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tra cứu thu nhập</title>
        <meta name="description" content="Tra cuu thu nhap" />
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>
      <h1>Home</h1>
    </div>
  )
}
