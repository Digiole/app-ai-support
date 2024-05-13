import '@/styles/globals.css'
import '@/styles/new-styles.css'
import Head from 'next/head'

import { main } from '../appConfig.js';
/* 
import '@/styles/styles.css'
 */
export default function App({ Component, pageProps }) {
  //console.log("COMPONENTS _app")
  return <>
    <Head>
      <title>{main.title}</title>
      <meta name="description" content={main.description}></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" href="/favicon.ico" />


      <meta property="og:title" content={main.title} />
      <meta property="og:description" content={main.description}></meta>

    </Head>
    <Component {...pageProps} />
  </>
}
