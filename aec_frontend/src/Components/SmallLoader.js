import React from 'react'
import { Spinner } from 'react-bootstrap'

function SmallLoader() {
  return (
    <Spinner
            animation='border'
            role='status'
            style={{
                height: '40px',
                width: '40px',
                margin: 'auto',
                display: 'block'
            }}
        >
            <span className='sr-only'>Loading...</span>
        </Spinner>
  )
}

export default SmallLoader