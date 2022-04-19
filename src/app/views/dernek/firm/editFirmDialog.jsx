import React, { useRef, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Grid, Icon, IconButton, TextField, Tooltip } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import ControlledAutocomplete from '../components/ControlledAutocomplete'
import { updateFirm } from '../../../services/service'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import trLocale from "date-fns/locale/tr";

const EditFirmDialog = (props) => {
    const [open, setOpen] = useState(false)
    const { handleSubmit, control, formState: { errors }, watch, getValues, setValue } = useForm();
    const profilePictureRef = useRef()
    const firm = props.data.data

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
                        {firm.name} {firm.surname} İsimli Kullanıcıyı Düzenle
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
                                            label="Kayıt No"
                                            type="number"
                                            disabled
                                            error={!!errors.registerNo}
                                        />
                                    }
                                    name="registerNo"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={firm.registerNo}
                                />

                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={trLocale}>
                                    <Controller
                                        name="registerDate"
                                        control={control}
                                        defaultValue={firm.registerDate.toDate()}
                                        render={({ field: { ref, ...rest } }) => (
                                            <KeyboardDatePicker
                                                className="mb-4 w-full"
                                                format="dd.MM.yyyy"
                                                margin="none"
                                                id="mui-pickers-date"
                                                label="Kayıt Tarihi"
                                                inputVariant="outlined"
                                                type="text"
                                                autoOk={true}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                okLabel="Tarih Seç"
                                                cancelLabel="Vazgeç"
                                                {...rest}
                                                error={!!errors.registerDate}
                                            />
                                        )}
                                    />
                                </MuiPickersUtilsProvider>

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Vergi No"
                                            type="number"
                                            error={!!errors.taxNo}
                                        />
                                    }
                                    name="taxNo"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={firm.taxNo}
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Firma Unvanı"
                                            type="text"
                                            error={!!errors.firmName}
                                        />
                                    }
                                    name="firmName"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={firm.firmName}
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Web Adresi"
                                            type="text"
                                            error={!!errors.webAddress}
                                        />
                                    }
                                    name="webAddress"
                                    control={control}
                                    rules={{ required: false }}
                                    defaultValue={firm.webAddress}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "Miktat Cento" }, { id: "y", typeName: "Hasan Oruç" }]}
                                    control={control}
                                    name="admin1"
                                    defaultValue={firm.admin1}
                                    required={true}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="1. Yetkili Kişi"
                                            type="text"
                                            error={!!errors.admin1}
                                        />
                                    )}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "Miktat Cento" }, { id: "y", typeName: "Hasan Oruç" }]}
                                    control={control}
                                    name="admin2"
                                    defaultValue={firm.admin2}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="2. Yetkili Kişi"
                                            type="text"
                                            error={!!errors.admin2}
                                        />
                                    )}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "Miktat Cento" }, { id: "y", typeName: "Hasan Oruç" }]}
                                    control={control}
                                    name="admin3"
                                    defaultValue={firm.admin3}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="3. Yetkili Kişi"
                                            type="text"
                                            error={!!errors.admin3}
                                        />
                                    )}
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="İş Telefonu"
                                            type="text"
                                            error={!!errors.businessPhone}
                                        />
                                    }
                                    name="businessPhone"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={firm.businessPhone}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <div>
                                    <div style={{ paddingBottom: "0.64rem" }}>
                                        <label htmlFor="profilePicture">
                                            {
                                                watch("profilePicture")
                                                    ? <img src={URL.createObjectURL(getValues("profilePicture"))} alt="profile" style={{ height: "7.74rem", width: "7.74rem", borderRadius: "1rem", objectFit: "cover" }} />
                                                    : <img src={firm.profileImage} alt="profile" style={{ height: "7.74rem", width: "7.74rem", borderRadius: "1rem", objectFit: "cover" }} />
                                            }
                                        </label>

                                        <Controller
                                            render={() =>
                                                <input id='profilePicture' ref={profilePictureRef} className="mb-4 w-full hidden" onChange={() => setValue("profilePicture", profilePictureRef.current.files[0])} type="file" accept="image/*" />
                                            }
                                            name="profilePicture"
                                            control={control}
                                            rules={{ required: false }}
                                            defaultValue={undefined}
                                        />
                                    </div>
                                </div>

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "Gaziantep" }, { id: "y", typeName: "Ankara" }]}
                                    control={control}
                                    name="city"
                                    defaultValue={firm.city}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    required={true}
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
                                    options={[{ id: "x", typeName: "Şahinbey" }, { id: "y", typeName: "Şehitkamil" }]}
                                    control={control}
                                    name="county"
                                    defaultValue={firm.county}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    required={true}
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

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "Barak" }, { id: "y", typeName: "Mücahitler" }]}
                                    control={control}
                                    name="district"
                                    defaultValue={firm.district}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    required={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Mahalle"
                                            type="text"
                                            error={!!errors.district}
                                        />
                                    )}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "100248" }, { id: "y", typeName: "100249" }]}
                                    control={control}
                                    name="street"
                                    defaultValue={firm.street}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    required={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Sokak"
                                            type="text"
                                            error={!!errors.street}
                                        />
                                    )}
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Bina No"
                                            type="text"
                                            error={!!errors.buildingNumber}
                                        />
                                    }
                                    name="buildingNumber"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={firm.buildingNumber}
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Açıklama"
                                            type="text"
                                            error={!!errors.description}
                                        />
                                    }
                                    name="description"
                                    control={control}
                                    rules={{ required: false }}
                                    defaultValue={firm.description}
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Cep Telefonu"
                                            type="phone"
                                            error={!!errors.mobilePhone}
                                        />
                                    }
                                    name="mobilePhone"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={firm.mobilePhone}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>
                            Hayır
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit((firm) => props.updateFirm(firm, props.data.id, () => { props.getFirmList();  setOpen(false); }, () => {console.log("hata")}))} autoFocus>
                            Evet
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </div >
    )
}

export default connect(null, {
    updateFirm
})(EditFirmDialog)
