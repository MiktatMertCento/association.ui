import { Button, Grid, Icon, TextField } from '@material-ui/core';
import { Breadcrumb, MatxLoading, SimpleCard } from 'app/components';
import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import ControlledAutocomplete from '../components/ControlledAutocomplete';
import useSettings from 'app/hooks/useSettings';
import { registerAdmin, getLastUserId } from 'app/services/service';
import { ServiceCalling } from '../../../services/serviceCalling';

const RegisterAdmin = (props) => {
    const { settings } = useSettings()
    const [isLoading, setIsLoading] = useState(true)
    const { setValue, handleSubmit, control, reset, formState: { errors } } = useForm();

    const getParameters = useCallback(
        async (isSaved) => {
            let lastUserId = await ServiceCalling.getLastUserId(props);
            setValue("registerNo", parseInt(lastUserId) + 1)

            if(!isSaved) {
                
            }

            setIsLoading(false);
        },
        [props, setValue]
    );

    useEffect(() => {
        getParameters();
    }, [getParameters])

    const defaultValues = {
        registerNo: "",
        idNo: "",
        city: null,
        name: "",
        surname: "",
        password: ""
    }

    return (
        <div className="m-sm-30">
            {isLoading
                ? <MatxLoading />
                : <div>
                    <div className="mb-sm-30">
                        <Breadcrumb
                            routeSegments={[
                                { name: settings.brandName, path: '/' },
                                { name: 'Admin İşlemleri', path: '/' },
                                { name: 'Admin Kayıt' },
                            ]}
                        />
                    </div>
                    <SimpleCard title="Admin Kayıt">
                        <form onSubmit={handleSubmit((user) => { props.registerAdmin(user, () => { getParameters(true); reset(defaultValues); }, () => console.log("başarısız")) })}>
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
                                        defaultValue=""
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
                                        defaultValue=""
                                    />

                                    <ControlledAutocomplete
                                        className="mb-4 w-full"
                                        options={[{ id: "x", typeName: "Gaziantep" }, { id: "y", typeName: "Ankara" }]}
                                        control={control}
                                        name="city"
                                        defaultValue={null}
                                        getOptionLabel={(option) => option.typeName}
                                        getOptionSelected={(option, value) => option.id === value.id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="İl"
                                                type="text"
                                                error={!!errors.birthCity}
                                            />
                                        )}
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
                                        defaultValue=""
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
                                        defaultValue=""
                                    />

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
                                        rules={{ required: true }}
                                        defaultValue=""
                                    />
                                </Grid>
                            </Grid>

                            <Button color="primary" variant="contained" type="submit">
                                <Icon>save</Icon>
                                <span className="pl-2 capitalize">Kayıt Et</span>
                            </Button>
                        </form>
                    </SimpleCard>
                </div>
            }
        </div>
    );
}

export default connect(null, {
    registerAdmin,
    getLastUserId
})(RegisterAdmin)
