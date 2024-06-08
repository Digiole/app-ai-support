import '@/styles/globals.css'
import '@/styles/new-styles.css'
import Head from 'next/head'

import { useRouter } from 'next/router';
import { main } from '../appConfig.js';
import Profile from './[username]/studio/Profile';
import KnowledgeBase from './[username]/studio/KnowledgeBase';
import SessionHistory from './[username]/studio/SessionHistory';
/* 
import '@/styles/styles.css'
 */
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const path = router.pathname;

  let RenderComponent = Component;

  // Route-specific component rendering for Studio pages
  if (path.startsWith('/[username]/studio')) {
    switch (path) {
      case '/[username]/studio/profile':
        RenderComponent = Profile;
        break;
      case '/[username]/studio/knowledgebase':
        RenderComponent = KnowledgeBase;
        break;
      case '/[username]/studio/session-history':
        RenderComponent = SessionHistory;
        break;
      default:
        RenderComponent = Component;
    }
  }
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
