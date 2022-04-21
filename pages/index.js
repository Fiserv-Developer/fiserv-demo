import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Demo site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p className="description">
          Really awesome Fiserv.developer demo site
        </p>
      </main>

    </div>
  )
}
