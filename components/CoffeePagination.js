import React from 'react'
import Pagination from 'react-bootstrap/Pagination'
import { emptyFn } from '../utils/helpers'
import styles from '../styles/CoffeePagination.module.css'

const CoffeePagination = (props) => {
  const items = []

  for (let number = 1; number <= 3; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === props.active}
        onClick={() => props.onPageClick(number)}
        className={number === props.active ? styles.active : styles.pageNumberBtns}
      >
        {number}
      </Pagination.Item>
    )
  }

  const paginationBasic = (
    <div className={styles.pagenumbers}>
      <Pagination size='sm'>{items}</Pagination>
    </div>
  )

  return paginationBasic
}

CoffeePagination.defaultProps = {
  onPageClick: emptyFn,
  active: ''
}

export default CoffeePagination
