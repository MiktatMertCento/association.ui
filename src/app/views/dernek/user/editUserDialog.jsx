import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Grid, Icon, IconButton, TextField, Tooltip } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import ControlledAutocomplete from '../components/ControlledAutocomplete'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import trLocale from "date-fns/locale/tr";
import { updateUser, getUserTypeList, getDistrictList, getForeignLanguageList, getJobList } from 'app/services/service';
import { ServiceCalling } from 'app/services/serviceCalling';
import counties from '../assets/json/Counties.json';
import cities from '../assets/json/Cities.json';
import bloodGroups from '../assets/json/BloodGroups.json';
import educationStatus from '../assets/json/EducationStatus.json';
import { MatxLoading } from 'app/components'


const EditUserDialog = (props) => {
    const [open, setOpen] = useState(false)
    const profilePictureRef = useRef()
    const user = props.data.data
    const { watch, setValue, getValues, handleSubmit, control, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(true)
    const [userTypes, setUserTypes] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [foreignLanguageList, setForeignLanguageList] = useState([])
    const [jobList, setJobList] = useState([])

    const getParameters = useCallback(
        async () => {
            setIsLoading(true);

            let userTypes_ = await ServiceCalling.getUserTypeList(props);
            setUserTypes(userTypes_)
            let districtList_ = await ServiceCalling.getDistrictList(props);
            setDistrictList(districtList_)
            let foreignLanguage_ = await ServiceCalling.getForeignLanguageList(props);
            setForeignLanguageList(foreignLanguage_)
            let jobList_ = await ServiceCalling.getJobList(props);
            setJobList(jobList_)

            setIsLoading(false);
        },
        [props]
    );

    useEffect(() => {
        if (open) getParameters();
    }, [getParameters, open])

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
                    fullWidth={!isLoading}
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {user.name} {user.surname} İsimli Kullanıcıyı Düzenle
                    </DialogTitle>
                    <DialogContent>
                        {
                            isLoading
                                ? <div style={{ paddingTop: "1rem" }}><MatxLoading /></div>
                                : <div>
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
                                                options={userTypes}
                                                control={control}
                                                name="userPosition"
                                                defaultValue={userTypes.find(x => x.id === user.userPosition)}
                                                required={true}
                                                getOptionLabel={(option) => option.data.typeName}
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
                                                            cancelLabel="Vazgeç"                                            {...rest}
                                                            error={!!errors.birthday}
                                                        />
                                                    )}
                                                />
                                            </MuiPickersUtilsProvider>

                                            <ControlledAutocomplete
                                                className="mb-4 w-full"
                                                options={cities}
                                                control={control}
                                                name="birthCity"
                                                defaultValue={cities.find(x => x.il === user.birthCity)}
                                                required={true}
                                                getOptionLabel={(option) => option.il}
                                                getOptionSelected={(option, value) => option.nviid === value.nviid}
                                                onChange={(() => { setValue("birthCounty", null) })}
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
                                                options={watch("birthCity") ? counties.filter(county => county.plaka === watch("birthCity").plaka) : []}
                                                control={control}
                                                name="birthCounty"
                                                defaultValue={counties.find(x => x.ilce === user.birthCounty)}
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

                                            <ControlledAutocomplete
                                                className="mb-4 w-full"
                                                options={watch("birthCounty") ? districtList.filter(district => district.data.county === watch("birthCounty").ilce) : []}
                                                control={control}
                                                name="birthDistrict"
                                                defaultValue={districtList.find(x => x.id === user.birthDistrict)}
                                                getOptionLabel={(option) => option.data.typeName}
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
                                                options={[{ id: "0", typeName: "Evli" }, { id: "1", typeName: "Bekar" }, { id: "2", typeName: "Boşanmış" }, { id: "3", typeName: "Dul" }]}
                                                control={control}
                                                name="maritalStatus"
                                                defaultValue={{ typeName: user.maritalStatus }}
                                                getOptionLabel={(option) => option.typeName}
                                                getOptionSelected={(option, value) => option.typeName === value.typeName}
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
                                                options={bloodGroups}
                                                control={control}
                                                name="bloodGroup"
                                                defaultValue={bloodGroups.find(x => x.typeName === user.bloodGroup)}
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
                                                <div style={{ paddingBottom: "0.64rem"}}>
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
                                                options={cities}
                                                control={control}
                                                name="liveCity"
                                                defaultValue={cities.find(x => x.il === user.liveCity)}
                                                required={true}
                                                getOptionLabel={(option) => option.il}
                                                getOptionSelected={(option, value) => option.nviid === value.nviid}
                                                onChange={(() => { setValue("liveCounty", null) })}
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
                                                options={watch("liveCity") ? counties.filter(county => county.plaka === watch("liveCity").plaka) : []}
                                                control={control}
                                                name="liveCounty"
                                                defaultValue={counties.find(x => x.ilce === user.liveCounty)}
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

                                            <ControlledAutocomplete
                                                className="mb-4 w-full"
                                                options={watch("liveCounty") ? districtList.filter(district => district.data.county === watch("liveCounty").ilce) : []}
                                                control={control}
                                                name="liveDistrict"
                                                defaultValue={districtList.find(x => x.id === user.liveDistrict)}
                                                getOptionLabel={(option) => option.data.typeName}
                                                getOptionSelected={(option, value) => option.id === value.id}
                                                required={true}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        label="Yaşadığı Mahalle"
                                                        type="text"
                                                        error={!!errors.birthDistrict}
                                                    />
                                                )}
                                            />

                                            <Controller
                                                render={({ field }) =>
                                                    <TextField
                                                        {...field}
                                                        className="mb-4 w-full"
                                                        variant="outlined"
                                                        label="Yaşdığı Sokak"
                                                        type="text"
                                                        multiline
                                                        error={!!errors.liveStreet}
                                                    />
                                                }
                                                name="liveStreet"
                                                control={control}
                                                defaultValue={user.liveStreet}
                                            />

                                            <Controller
                                                render={({ field }) =>
                                                    <TextField
                                                        {...field}
                                                        className="mb-4 w-full"
                                                        variant="outlined"
                                                        label="Yaşadığı Bina No"
                                                        type="text"
                                                        multiline
                                                        error={!!errors.liveBuildingNo}
                                                    />
                                                }
                                                name="liveBuildingNo"
                                                control={control}
                                                defaultValue={user.liveBuildingNo}
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
                                                options={educationStatus}
                                                control={control}
                                                name="education"
                                                defaultValue={educationStatus.find(x => x.typeName === user.education)}
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
                                                options={foreignLanguageList}
                                                control={control}
                                                name="foreignLanguage"
                                                defaultValue={foreignLanguageList.find(x => x.id === user.foreignLanguage)}
                                                getOptionLabel={(option) => option.data.typeName}
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
                                        options={jobList}
                                        control={control}
                                        name="job"
                                        defaultValue={jobList.find(x => x.id === user.job)}
                                        getOptionLabel={(option) => option.data.typeName}
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
                                </div>
                        }
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
    updateUser,
    getUserTypeList,
    getDistrictList,
    getForeignLanguageList,
    getJobList
})(EditUserDialog)
