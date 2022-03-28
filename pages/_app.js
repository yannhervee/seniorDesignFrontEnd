import Layout from '../components/Layout'
import '../styles/globals.css'
import { Provider } from "react-redux"
import store from "../app/store"

import 'react-loading-skeleton/dist/skeleton.css'

function MyApp({ Component, pageProps }) {
  return (

    <Layout>
      <Provider store = {store}>
      <Component {...pageProps} />
      </Provider>

     </Layout>
  )
}

export default MyApp
