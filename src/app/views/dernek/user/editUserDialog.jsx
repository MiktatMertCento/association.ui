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
import { updateUser } from '../../../services/service'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import trLocale from "date-fns/locale/tr";

const EditUserDialog = (props) => {
    const [open, setOpen] = useState(false)
    const { handleSubmit, control, formState: { errors }, watch, getValues, setValue } = useForm();
    const profilePictureRef = useRef()
    const user = props.data.data

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
                        {user.name} {user.surname} İsimli Kullanıcıyı Düzenle
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
                                            error={!!errors.registerNo}
                                        />
                                    }
                                    name="registerNo"
                                    control={control}
                                    defaultValue={user.registerNo}
                                />

                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={trLocale}>
                                    <Controller
                                        name="registerDate"
                                        control={control}
                                        defaultValue={user.registerDate.toDate()}
                                        render={({ field: { ref, ...rest } }) => (
                                            <KeyboardDatePicker
                                                className="mb-4 w-full"
                                                format="dd.MM.yyyy"
                                                margin="none"
                                                id="mui-pickers-date"
                                                label="Üye Tarihi"
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

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "Başkan" }, { id: "y", typeName: "Başkan Vekili" }]}
                                    control={control}
                                    name="userPosition"
                                    defaultValue={user.userPosition}
                                    required={true}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Üye Tipi"
                                            type="text"
                                            error={!!errors.userPosition}
                                        />
                                    )}
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Kimlik No"
                                            type="number"
                                            error={!!errors.idNo}
                                        />
                                    }
                                    name="idNo"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={user.idNo}
                                />

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

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Baba Adı"
                                            type="text"
                                            error={!!errors.fatherName}
                                        />
                                    }
                                    name="fatherName"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={user.fatherName}
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Anne Adı"
                                            type="text"
                                            error={!!errors.motherName}
                                        />
                                    }
                                    name="motherName"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={user.motherName}
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Doğum Yeri"
                                            type="text"
                                            error={!!errors.placeOfBirth}
                                        />
                                    }
                                    name="placeOfBirth"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={user.placeOfBirth}
                                />

                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={trLocale}>
                                    <Controller
                                        name="birthday"
                                        control={control}
                                        defaultValue={user.birthday.toDate()}
                                        render={({ field: { ref, ...rest } }) => (
                                            <KeyboardDatePicker
                                                className="mb-4 w-full"
                                                format="dd.MM.yyyy"
                                                margin="none"
                                                id="mui-pickers-date"
                                                label="Doğum Tarihi"
                                                inputVariant="outlined"
                                                type="text"
                                                autoOk={true}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                okLabel="Tarih Seç"
                                                cancelLabel="Vazgeç"
                                                {...rest}
                                                error={!!errors.birthday}
                                            />
                                        )}
                                    />
                                </MuiPickersUtilsProvider>

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "Gaziantep" }, { id: "y", typeName: "Ankara" }]}
                                    control={control}
                                    name="birthCity"
                                    defaultValue={user.birthCity}
                                    required={true}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Doğduğu İl"
                                            type="text"
                                            error={!!errors.birthCity}
                                        />
                                    )}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "Şahinbey" }, { id: "y", typeName: "Şehitkamil" }]}
                                    control={control}
                                    name="birthCounty"
                                    defaultValue={user.birthCounty}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    required={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Doğduğu İlçe"
                                            type="text"
                                            error={!!errors.birthCounty}
                                        />
                                    )}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "Barak" }, { id: "y", typeName: "Mücahitler" }]}
                                    control={control}
                                    name="birthDistrict"
                                    defaultValue={user.birthDistrict}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    required={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Doğduğu Mahalle"
                                            type="text"
                                            error={!!errors.birthDistrict}
                                        />
                                    )}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "Evli" }, { id: "y", typeName: "Dul" }]}
                                    control={control}
                                    name="maritalStatus"
                                    defaultValue={user.maritalStatus}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    required={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Medeni Hali"
                                            type="text"
                                            error={!!errors.maritalStatus}
                                        />
                                    )}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "0RH+" }, { id: "y", typeName: "0RH-" }]}
                                    control={control}
                                    name="bloodGroup"
                                    defaultValue={user.bloodGroup}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    required={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Kan Grubu"
                                            type="text"
                                            error={!!errors.bloodGroup}
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
                                            type="phone"
                                            error={!!errors.businessPhone}
                                        />
                                    }
                                    name="businessPhone"
                                    control={control}
                                    defaultValue={user.businessPhone}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <div>
                                    <div style={{ paddingBottom: "0.64rem" }}>
                                        <label htmlFor="profilePicture">
                                            {
                                                watch("profilePicture")
                                                    ? <img src={URL.createObjectURL(getValues("profilePicture"))} alt="profile" style={{ height: "7.74rem", width: "7.74rem", borderRadius: "1rem", objectFit: "cover" }} />
                                                    : <img src={user.profilePicture} alt="profile" style={{ height: "7.74rem", width: "7.74rem", borderRadius: "1rem", objectFit: "cover" }} />
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
                                    name="liveCity"
                                    defaultValue={user.liveCity}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    required={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Yaşadığı İl"
                                            type="text"
                                            error={!!errors.liveCity}
                                        />
                                    )}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "Şahinbey" }, { id: "y", typeName: "Şehitkamil" }]}
                                    control={control}
                                    name="liveCounty"
                                    defaultValue={user.liveCounty}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    required={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Yaşadığı İlçe"
                                            type="text"
                                            error={!!errors.liveCounty}
                                        />
                                    )}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "Barak" }, { id: "y", typeName: "Mücahitler" }]}
                                    control={control}
                                    name="liveDistrict"
                                    defaultValue={user.liveDistrict}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    required={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Yaşadığı Mahalle"
                                            type="text"
                                            error={!!errors.liveDistrict}
                                        />
                                    )}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "100248" }, { id: "y", typeName: "100249" }]}
                                    control={control}
                                    name="liveStreet"
                                    defaultValue={user.liveStreet}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    required={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Yaşadığı Sokak"
                                            type="text"
                                            error={!!errors.liveStreet}
                                        />
                                    )}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "35" }, { id: "y", typeName: "36" }]}
                                    control={control}
                                    name="liveBuildingNo"
                                    defaultValue={user.liveBuildingNo}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    required={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Yaşadığı Bina No"
                                            type="text"
                                            error={!!errors.liveBuildingNo}
                                        />
                                    )}
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="İş Adresi"
                                            type="text"
                                            multiline
                                            error={!!errors.businessAddress}
                                        />
                                    }
                                    name="businessAddress"
                                    control={control}
                                    defaultValue={user.businessAddress}
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
                                    defaultValue={user.description}
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="E-Mail"
                                            type="email"
                                            error={!!errors.email}
                                        />
                                    }
                                    name="email"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={user.email}
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Facebook"
                                            type="text"
                                            error={!!errors.facebook}
                                        />
                                    }
                                    name="facebook"
                                    control={control}
                                    defaultValue={user.facebook}
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Twitter"
                                            type="text"
                                            error={!!errors.twitter}
                                        />
                                    }
                                    name="twitter"
                                    control={control}
                                    defaultValue={user.twitter}
                                />

                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Instagram"
                                            type="text"
                                            error={!!errors.instagram}
                                        />
                                    }
                                    name="instagram"
                                    control={control}
                                    defaultValue={user.instagram}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "Lise" }, { id: "y", typeName: "Üniversite" }, { id: "z", typeName: "Yüksek Lisans" }]}
                                    control={control}
                                    name="education"
                                    defaultValue={user.education}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    required={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Eğitim Durumu"
                                            type="text"
                                            error={!!errors.education}
                                        />
                                    )}
                                />

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={[{ id: "x", typeName: "İngilizce" }, { id: "y", typeName: "Almanca" }, { id: "z", typeName: "Fransızca" }]}
                                    control={control}
                                    name="foreignLanguage"
                                    defaultValue={user.foreignLanguage}
                                    getOptionLabel={(option) => option.typeName}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    required={true}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Yabancı Dil"
                                            type="text"
                                            error={!!errors.foreignLanguage}
                                        />
                                    )}
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
                                    defaultValue={user.mobilePhone}
                                />
                            </Grid>
                        </Grid>

                        <ControlledAutocomplete
                            className="mb-4 w-full"
                            options={[{ id: "x", typeName: "Polis" }, { id: "y", typeName: "Doktor" }]}
                            control={control}
                            name="job"
                            defaultValue={user.job}
                            getOptionLabel={(option) => option.typeName}
                            getOptionSelected={(option, value) => option.id === value.id}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Mesleği"
                                    type="text"
                                    error={!!errors.job}
                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>
                            Hayır
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit((user) => props.updateUser(user, props.data.data, props.data.id, () => { setOpen(false); props.getUserList(); }, () => { }))} autoFocus>
                            Evet
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </div >
    )
}

export default connect(null, {
    updateUser
})(EditUserDialog)
