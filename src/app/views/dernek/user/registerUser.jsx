import { Button, Grid, Icon, TextField } from '@material-ui/core';
import { Breadcrumb, MatxLoading, SimpleCard } from 'app/components';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns'
import trLocale from "date-fns/locale/tr";
import ControlledAutocomplete from '../components/ControlledAutocomplete';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import useSettings from 'app/hooks/useSettings';
import { registerUser, getLastId, getUserTypeList, getDistrictList, getForeignLanguageList, getJobList } from 'app/services/service';
import { ServiceCalling } from 'app/services/serviceCalling';
import counties from '../assets/json/Counties.json';
import cities from '../assets/json/Cities.json';
import bloodGroups from '../assets/json/BloodGroups.json';
import educationStatus from '../assets/json/EducationStatus.json';

const UserRegistration = (props) => {
    const { settings } = useSettings()
    const [isLoading, setIsLoading] = useState(true)
    const profilePictureRef = useRef()
    const { watch, setValue, getValues, handleSubmit, control, reset, formState: { errors } } = useForm();
    const [userTypes, setUserTypes] = useState([])
    const [districtList, setDistrictList] = useState([])
    const [foreignLanguageList, setForeignLanguageList] = useState([])
    const [jobList, setJobList] = useState([])

    const getParameters = useCallback(
        async () => {
            let lastUserId = await ServiceCalling.getLastId(props, 'users');
            setValue("registerNo", parseInt(lastUserId) + 1)

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
        [props, setValue]
    );

    useEffect(() => {
        getParameters();
    }, [getParameters])


    const defaultValues = {
        registerNo: "",
        registerDate: new Date(),
        userPosition: null,
        idNo: "",
        name: "",
        surname: "",
        fatherName: "",
        motherName: "",
        placeOfBirth: "",
        birthday: new Date(),
        birthCity: null,
        birthCounty: null,
        birthDistrict: null,
        maritalStatus: null,
        bloodGroup: null,
        businessPhone: "",
        profilePicture: undefined,
        liveCity: null,
        liveCounty: null,
        liveDistrict: null,
        liveStreet: "",
        liveBuildingNo: "",
        businessAddress: "",
        description: "",
        email: "",
        facebook: "",
        twitter: "",
        instagram: "",
        education: null,
        foreignLanguage: null,
        mobilePhone: "",
        job: null
    }


    return (
        <div className="m-sm-30">
            {
                isLoading
                    ? <MatxLoading />
                    : <div>
                        <div className="mb-sm-30">
                            <Breadcrumb
                                routeSegments={[
                                    { name: settings.brandName, path: '/' },
                                    { name: 'Üye İşlemleri', path: '/' },
                                    { name: 'Üye Kayıt' },
                                ]}
                            />
                        </div>
                        <SimpleCard title="Üye Kayıt">
                            <form onSubmit={handleSubmit((user) => {
                                props.registerUser(user, () => { reset(defaultValues); getParameters(); }, () => console.log("başarısız"))
                            })}>
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
                                            defaultValue={0}
                                        />

                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={trLocale}>
                                            <Controller
                                                name="registerDate"
                                                control={control}
                                                defaultValue={new Date()}
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
                                            defaultValue={null}
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
                                            defaultValue=""
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
                                                    label="Baba Adı"
                                                    type="text"
                                                    error={!!errors.fatherName}
                                                />
                                            }
                                            name="fatherName"
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
                                                    label="Anne Adı"
                                                    type="text"
                                                    error={!!errors.motherName}
                                                />
                                            }
                                            name="motherName"
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
                                                    label="Doğum Yeri"
                                                    type="text"
                                                    error={!!errors.placeOfBirth}
                                                />
                                            }
                                            name="placeOfBirth"
                                            control={control}
                                            rules={{ required: true }}
                                            defaultValue=""
                                        />

                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={trLocale}>
                                            <Controller
                                                name="birthday"
                                                control={control}
                                                defaultValue={new Date()}
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
                                            options={cities}
                                            control={control}
                                            name="birthCity"
                                            defaultValue={null}
                                            getOptionLabel={(option) => option.il}
                                            getOptionSelected={(option, value) => option.nviid === value.nviid}
                                            onChange={(() => { setValue("birthCounty", null); setValue("birthDistrict", null); })}
                                            required={true}
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

                                        <ControlledAutocomplete
                                            className="mb-4 w-full"
                                            options={watch("birthCity") ? counties.filter(county => county.plaka === watch("birthCity").plaka) : []}
                                            control={control}
                                            name="birthCounty"
                                            defaultValue={null}
                                            getOptionLabel={(option) => option.ilce}
                                            getOptionSelected={(option, value) => option.nviid === value.nviid}
                                            onChange={(() => { setValue("birthDistrict", null); })}
                                            required={true}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    label="İlçe"
                                                    type="text"
                                                    error={!!errors.birthCounty}
                                                />
                                            )}
                                        />

                                        <ControlledAutocomplete
                                            className="mb-4 w-full"
                                            options={watch("birthCounty") ? districtList.filter(district => district.data.county === watch("birthCounty").ilce) : []}
                                            control={control}
                                            name="birthDistrict"
                                            defaultValue={null}
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
                                            defaultValue={null}
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
                                            options={bloodGroups}
                                            control={control}
                                            name="bloodGroup"
                                            defaultValue={null}
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
                                            defaultValue=""
                                        />
                                    </Grid>

                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <div>
                                            <div style={{ paddingBottom: watch("profilePicture") ? "0.64rem" : "0rem" }}>
                                                <label htmlFor="profilePicture">
                                                    {
                                                        watch("profilePicture")
                                                            ? <img src={URL.createObjectURL(getValues("profilePicture"))} alt="profile" style={{ height: "7.74rem", width: "7.74rem", borderRadius: "1rem", objectFit: "cover" }} />
                                                            : <div style={{ height: "7.74rem", width: "7.74rem", marginBottom: "1rem", borderRadius: "1rem", objectFit: "cover", backgroundColor: "#dedede", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", gap: "2rem" }} >
                                                                <h4>RESİM</h4>
                                                                <h6>Seçmek için tıklayınız.</h6>
                                                            </div>
                                                    }
                                                </label>

                                                <Controller
                                                    render={() =>
                                                        <input id='profilePicture' ref={profilePictureRef} className="mb-4 w-full hidden" onChange={() => setValue("profilePicture", profilePictureRef.current.files[0])} type="file" accept="image/*" />
                                                    }
                                                    name="profilePicture"
                                                    control={control}
                                                    rules={{ required: true }}
                                                    defaultValue={undefined}
                                                />
                                            </div>
                                        </div>

                                        <ControlledAutocomplete
                                            className="mb-4 w-full"
                                            options={cities}
                                            control={control}
                                            name="liveCity"
                                            defaultValue={null}
                                            required={true}
                                            getOptionLabel={(option) => option.il}
                                            getOptionSelected={(option, value) => option.nviid === value.nviid}
                                            onChange={(() => { setValue("liveCounty", null); setValue("liveDistrict", null); })}
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
                                            options={watch("liveCity") ? counties.filter(county => county.plaka === watch("liveCity").plaka) : []}
                                            control={control}
                                            name="liveCounty"
                                            onChange={(() => { setValue("liveDistrict", null); })}
                                            defaultValue={null}
                                            required={true}
                                            getOptionLabel={(option) => option.ilce}
                                            getOptionSelected={(option, value) => option.nviid === value.nviid}
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
                                            options={watch("liveCounty") ? districtList.filter(district => district.data.county === watch("liveCounty").ilce) : []}
                                            control={control}
                                            name="liveDistrict"
                                            defaultValue={null}
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
                                            rules={{ required: true }}
                                            name="liveStreet"
                                            control={control}
                                            defaultValue=""
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
                                            rules={{ required: true }}
                                            name="liveBuildingNo"
                                            control={control}
                                            defaultValue=""
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
                                            defaultValue=""
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
                                            defaultValue=""
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
                                            defaultValue=""
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
                                            defaultValue=""
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
                                            defaultValue=""
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
                                            defaultValue=""
                                        />

                                        <ControlledAutocomplete
                                            className="mb-4 w-full"
                                            options={educationStatus}
                                            control={control}
                                            name="education"
                                            defaultValue={null}
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
                                            defaultValue={null}
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
                                            defaultValue=""
                                        />
                                    </Grid>
                                </Grid>

                                <ControlledAutocomplete
                                    className="mb-4 w-full"
                                    options={jobList}
                                    control={control}
                                    name="job"
                                    defaultValue={null}
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
    registerUser,
    getLastId,
    getUserTypeList,
    getDistrictList,
    getForeignLanguageList,
    getJobList
})(UserRegistration)
