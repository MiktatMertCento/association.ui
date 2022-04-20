import React from 'react'
import Logo from '../../views/dernek/assets/logo.png'

const MatxLogo = ({ className, size }) => {

    return (
        <img width={size ?? "50rem"} height={size ?? "50rem"} src={Logo} alt="logo" />
    )
}

export default MatxLogo
