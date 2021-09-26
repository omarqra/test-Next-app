import { useRouter } from "next/dist/client/router";
import Layout from '../components/Layout/Layout';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    console.log(router.asPath==="/writer"? true: false);
    let rightComponent = () => {
      if (router.asPath === "/writer") return <Component {...pageProps} />
      else return <Layout><Component {...pageProps} /></Layout>
    }
  return <>{rightComponent()}</>
}

export default MyApp
