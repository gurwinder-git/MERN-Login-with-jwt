import React from 'react'

function Footer() {
    let footerStyle = {
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        padding: '1em 0em',
        marginTop: '2rem',
        fontSize: 'smaller',
        fontWeight: '700'
    }
    return (
        <div style = {footerStyle}>
            All Rights Are Reserved
        </div>
    )
}

export default Footer
