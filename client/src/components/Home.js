import React from 'react'

function Home() {
    const homeStyle = {
    textAlign: 'center',
    margin: '4rem',
    }
    return (
        <div style = {homeStyle}>
            <p style={{textTransform: 'uppercase'}}>Welcome!!!</p>
            <p style={{fontSize: 'xx-large'}}>Gurwinder Singh</p>
        </div>
    )
}

export default Home
