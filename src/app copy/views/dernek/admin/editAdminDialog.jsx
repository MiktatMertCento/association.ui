import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Grid, Icon, IconButton, TextField, Tooltip } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import ControlledAutocomplete from '../components/ControlledAutocomplete'
import { updateAdmin } from '../../../services/service'

const EditAdminDialog = (props) => {
    const [open, setOpen] = useState(false)
    const { handleSubmit, control, formState: { errors } } = useForm();
    const admin = props.data.data

    return (
        <div>
            <Tooltip title="Düzenle" placement="top">
                <IconButton onClick={() => setOpen(true)}>
                    <Icon style={{ color: 'orange' }}>edit</Icon>
                </IconButton>
            </Tooltip>
            {
                open &&
                <Dialog
                    fullWidth={true}
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {admin.name} {admin.surname} İsimli Yöneticiyi Düzenle
                    </DialogTitle>
                    <DialogContent>

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
                                    defaultValue={admin.registerNo}
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
                                    defaultValue={admin.idNo}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "Gaziantep" }, { id: "y", typeName: "Ankara" }]}
                                    control={control}
                                    name="city"
                                    defaultValue={admin.city}
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
                                    defaultValue={admin.name}
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
                                    defaultValue={admin.surname}
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
                                    rules={{ required: false }}
                                    defaultValue=""
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>
                            Hayır
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit((admin) => props.updateAdmin(admin, props.data.data, props.data.id, () => { setOpen(false); props.getAdminList(); }, () => { }))} autoFocus>
                            Evet
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </div >
    )
}

export default connect(null, {
    updateAdmin
})(EditAdminDialog)
