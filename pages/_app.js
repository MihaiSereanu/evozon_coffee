import React from 'react'
import { wrapper } from '../redux/store'

import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function MyApp ({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

export default wrapper.withRedux(MyApp)
