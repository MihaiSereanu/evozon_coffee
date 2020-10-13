import React from 'react'
import { WithWizard } from 'react-albus'
import { Line } from 'rc-progress'
import { Button } from 'react-bootstrap'
import styles from '../../styles/Checkout.module.css'

const Navigation = (props) => {
  const { handleFinishOrder } = props

  return (
    <WithWizard
      render={({ next, previous, step, steps }) => (
        <div>
          <Line
            percent={(steps.indexOf(step) + 1) / steps.length * 100}
            strokeColor='#833921'
            trailColor='#ffffff'
          />

          <div className={styles.checkoutButtons}>
            {steps.indexOf(step) > 0 && (
              <Button variant='light' onClick={previous}> Back </Button>
            )}

            {steps.indexOf(step) < steps.length - 1 && (
              <Button variant='light' onClick={next}> Next </Button>
            )}

            {steps.indexOf(step) === steps.length - 1 && (
              <Button variant='light' onClick={handleFinishOrder}> Finish order </Button>
            )}
          </div>
        </div>
      )}
    />
  )
}

export default Navigation
