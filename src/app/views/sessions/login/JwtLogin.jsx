import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
    Card,
    Grid,
    Button,
    CircularProgress,
    TextField,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import history from 'history.js'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'
import SnackbarUtils from 'app/views/dernek/components/SnackbarUtils'
import { MatxLogo } from 'app/components'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    cardHolder: {
        background: '#1A2038',
    },
    card: {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const JwtLogin = () => {
    const { handleSubmit, control } = useForm();
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()

    const classes = useStyles()


    const handleFormSubmit = async (formData) => {
        setLoading(true)
        try {
            await login(formData.username, formData.password)
            history.push('/')
        } catch (e) {
            SnackbarUtils.error(e.message)
            setLoading(false)
        }
    }

    return (
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen',
                classes.cardHolder
            )}
        >
            <Card className={classes.card}>
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <div className="p-8 flex justify-center items-center h-full">
                            <MatxLogo size="160rem" />
                        </div>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <div className="p-8 h-full bg-light-gray relative">
                            <form onSubmit={handleSubmit(handleFormSubmit)}>
                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="TC Kimlik Numarası"
                                            type="text"
                                        />
                                    }
                                    name="username"
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    defaultValue=""
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Şifre"
                                            type="password"
                                        />
                                    }
                                    name="password"
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    defaultValue=""
                                />

                                <div className="w-full flex flex-wrap items-center mb-4">
                                    <div className="w-full relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            className="w-full"
                                            type="submit"
                                        >
                                            Giriş Yap
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                className={
                                                    classes.buttonProgress
                                                }
                                            />
                                        )}
                                    </div>

                                </div>
                                {/*<Button
                                    className="text-primary"
                                    onClick={() =>
                                        history.push('/session/forgot-password')
                                    }
                                >
                                    Forgot password?
                                </Button>*/}
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default JwtLogin
