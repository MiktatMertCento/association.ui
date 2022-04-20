import { Button, Grid, Icon, TextField } from '@material-ui/core';
import { Breadcrumb, MatxLoading, SimpleCard } from 'app/components';
import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import useSettings from 'app/hooks/useSettings';
import { updateAdmin } from 'app/services/service';
import useAuth from 'app/hooks/useAuth';


const EditAdminProfile = (props) => {
    const { settings } = useSettings()
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const { handleSubmit, control, formState: { errors } } = useForm();

    const getParameters = useCallback(
        async (isSaved) => {


            if (!isSaved) {

            }

            setIsLoading(false);
        },
        []
    );

    useEffect(() => {
        getParameters();
    }, [getParameters])

    return (
        <div className="m-sm-30">
            {isLoading
                ? <MatxLoading />
                : <div>
                    <div className="mb-sm-30">
                        <Breadcrumb
                            routeSegments={[
                                { name: settings.brandName, path: '/' },
                                { name: 'Profil İşlemleri', path: '/' },
                                { name: 'Hesabı Düzenle' },
                            ]}
                        />
                    </div>
                    <SimpleCard title="Hesabı Düzenle">
                        <form onSubmit={handleSubmit((admin) => { props.updateAdmin(admin, user, user.id, () => { getParameters(true); }, () => console.log("başarısız")) })}>
                            <Grid container spacing={6}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Controller
                                        render={({ field }) =>
                                            <TextField
                                                {...field}
                                                className="mb-4 w-full"
                                                variant="outlined"
                                                label="Üye No"
                                                type="number"
                                                disabled
                                                error={!!errors.registrationNo}
                                            />
                                        }
                                        name="registerNo"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={user.registerNo}
                                    />

                                    <Controller
                                        render={({ field }) =>
                                            <TextField
                                                {...field}
                                                className="mb-4 w-full"
                                                variant="outlined"
                                                label="TC Kimlik No"
                                                type="number"
                                                error={!!errors.idNo}
                                            />
                                        }
                                        name="idNo"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={user.idNo}
                                    />
                                </Grid>

                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Controller
                                        render={({ field }) =>
                                            <TextField
                                                {...field}
                                                className="mb-4 w-full"
                                                variant="outlined"
                                                label="Adı"
                                                type="text"
                                                error={!!errors.name}
                                            />
                                        }
                                        name="name"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={user.name}
                                    />

                                    <Controller
                                        render={({ field }) =>
                                            <TextField
                                                {...field}
                                                className="mb-4 w-full"
                                                variant="outlined"
                                                label="Soyadı"
                                                type="text"
                                                error={!!errors.surname}
                                            />
                                        }
                                        name="surname"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={user.surname}
                                    />
                                </Grid>
                            </Grid>

                            <Controller
                                render={({ field }) =>
                                    <TextField
                                        {...field}
                                        className="mb-4 w-full"
                                        variant="outlined"
                                        label="Şifresi"
                                        type="text"
                                        error={!!errors.password}
                                    />
                                }
                                name="password"
                                control={control}
                                rules={{ required: false }}
                                defaultValue=""
                            />

                            <Button color="primary" variant="contained" type="submit">
                                <Icon>save</Icon>
                                <span className="pl-2 capitalize">Kayıt Et</span>
                            </Button>
                        </form>
                    </SimpleCard>
                </div>
            }
        </div >
    );
}

export default connect(null, {
    updateAdmin,
})(EditAdminProfile)
