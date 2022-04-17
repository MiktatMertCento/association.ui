import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="flex flex-column justify-center items-center h-full-screen w-full">
            <div>Aradığınız sayfa bulunamadı, anasayfaya dönmek için tıklanyın</div>
            <Link to="/">
                <Button
                    className="capitalize"
                    variant="contained"
                    color="primary"
                >
                    Anasayfaya geri dön
                </Button>
            </Link>
        </div>
    )
}

export default NotFound
