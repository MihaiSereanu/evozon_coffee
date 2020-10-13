import Head from 'next/head'
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

import CoffeePagination from '../components/CoffeePagination'
import ProductsList from '../components/ProductsList'
import { PRODUCTS_ARR } from '../constants/data'
import Page from '../components/Page'

export default function Home () {
  const [productsPerPage, setProductsPerPage] = useState([...PRODUCTS_ARR.slice(0, 6)])
  const [activeClass, setActiveClass] = useState(1)

  const handlePageClick = (id) => {
    const start = (id - 1) * 6
    const end = id * 6
    setProductsPerPage([
      ...PRODUCTS_ARR.slice(start, end)
    ])
    setActiveClass(id)
  }

  return (
    <div>
      <Head>
        <title>ROFL</title>
        <link rel='icon' href='/favicon.ico' />
        <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' rel='stylesheet' />
      </Head>

      <Page>
        <Container>
          <ProductsList products={productsPerPage} />
          <CoffeePagination onPageClick={handlePageClick} active={activeClass} />
        </Container>
      </Page>
    </div>
  )
}

Home.defaultProps = {
  PRODUCTS_ARR: []
}
