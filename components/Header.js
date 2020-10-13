import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import Link from 'next/link'

import styles from '../styles/Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { emptyFn } from '../utils/helpers'

const Header = props => {
  return (
    <Navbar expand='sm' className={styles.color}>
      <Navbar.Brand className={styles.mright}>
        <FontAwesomeIcon icon={faCoffee} className={styles.icon_size} />
      </Navbar.Brand>
      <Nav className={styles.goodfont}>
        <Link as='/' href='/'>Shop</Link>
        <Link as='/RollYourOwn' href='/RollYourOwn' className={styles.headerLink}>Roll your Own</Link>
      </Nav>
      <span className={styles.numberOfProducts}>{props.numberOfProducts}</span>
      <Button variant='link'><FontAwesomeIcon icon={faShoppingCart} className={styles.icon_size} onClick={() => props.showCart()} /></Button>
    </Navbar>
  )
}

Header.defaultProps = {
  numberOfProducts: 0,
  showCart: emptyFn
}

export default Header
