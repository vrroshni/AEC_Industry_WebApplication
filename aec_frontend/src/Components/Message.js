import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'

function Message({ variant, children }) {
    const [show, setShow] = useState(true);
    const handleVisible = () => { 
        setTimeout(() => {
            setShow(false)
        }, 2000);
    } 
    useEffect(() => {
        handleVisible();
    })
    

    if (show) {
        return (
            <Alert variant={variant} onClose={() => setShow(false)} dismissible>
                {children}
            </Alert>
        )
    }
}

export default Message
