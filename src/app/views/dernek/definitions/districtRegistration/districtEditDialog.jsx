import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Grid, Icon, IconButton, TextField, Tooltip } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { updateDistrict } from '../../../../services/service'
import counties from '../../assets/json/Counties.json';
import cities from '../../assets/json/Cities.json';
import ControlledAutocomplete from '../../components/ControlledAutocomplete'

const EditDistrictDialog = (props) => {
    const [open, setOpen] = useState(false)
    const { handleSubmit, control, formState: { errors }, watch, setValue } = useForm();
    const district = props.data.data

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
                        {district.typeName} Düzenle
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
                                            label="Mahalle/Köy Numarası"
                                            type="text"
                                            disabled
                                            error={!!errors.registerNo}
                                        />
                                    }
                                    name="registerNo"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={district.registerNo}
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Mahalle/Köy Adı"
                                            type="text"
                                            error={!!errors.typeName}
                                        />
                                    }
                                    name="typeName"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={district.typeName}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={cities}
                                    control={control}
                                    name="city"
                                    defaultValue={cities.find(x => x.il === district.city)}
                                    required={true}
                                    getOptionLabel={(option) => option.il}
                                    getOptionSelected={(option, value) => option.nviid === value.nviid}
                                    onChange={(() => { setValue("county", null) })}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="İl"
                                            type="text"
                                            error={!!errors.city}
                                        />
                                    )}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={watch("city") ? counties.filter(county => county.plaka === watch("city").plaka) : []}
                                    control={control}
                                    name="county"
                                    defaultValue={counties.find(x => x.ilce === district.county)}
                                    required={true}
                                    getOptionLabel={(option) => option.ilce}
                                    getOptionSelected={(option, value) => option.nviid === value.nviid}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="İlçe"
                                            type="text"
                                            error={!!errors.county}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>
                            Hayır
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit((district) => props.updateDistrict(district, props.data.id, () => { setOpen(false); props.getParameters(); }, () => { }))} autoFocus>
                            Evet
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </div >
    )
}

export default connect(null, {
    updateDistrict
})(EditDistrictDialog)
