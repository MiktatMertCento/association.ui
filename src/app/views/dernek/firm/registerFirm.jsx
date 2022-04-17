import { Button, Grid, Icon, TextField } from '@material-ui/core';
import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns'
import trLocale from "date-fns/locale/tr";
import ControlledAutocomplete from '../components/ControlledAutocomplete';
import genders from '../assets/json/Genders.json'
import bloodGroups from '../assets/json/BloodGroups.json'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import useSettings from 'app/hooks/useSettings';

const RegisterFirm = (props) => {
  const { settings } = useSettings()
  const [profileImage, setProfileImage] = useState(null)
  const { handleSubmit, control, reset, formState: { errors } } = useForm();

  const defaultValues = {
    registrationNo: "",
    registrationDate: new Date(),
    userType: null,
    idNo: "",
    name: "",
    surname: "",
    fatherName: "",
    motherName: "",
    placeOfBirth: "",
    birthday: new Date(),
    maritalStatus: null,
    bloodGroup: null,
    job: null,
    education: null,
    country: "",
    county: "",
    district: "",
    street: "",
    buildingNo: "",
    businessAddress: "",
    description: "",
    email: "",
    facebook: "",
    twitter: "",
    instagram: "",
    foreignLanguage: null,
    mobilePhone: "",
    businessPhone: "",
    firm: null
  }


  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: settings.brandName, path: '/' },
            { name: 'Firma İşlemleri', path: '/' },
            { name: 'Firma Kayıt' },
          ]}
        />
      </div>
      <SimpleCard title="Firma Kayıt">
        <form onSubmit={handleSubmit((user) => {
          console.log(user);
          reset(defaultValues);
        })}>
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
                    error={!!errors.registrationNo}
                  />
                }
                name="registrationNo"
                control={control}
                rules={{ required: true }}
                defaultValue=""
              />

              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={trLocale}>
                <Controller
                  name="registrationDate"
                  control={control}
                  defaultValue={new Date()}
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
                      error={!!errors.registrationDate}
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
                    error={!!errors.registrationNo}
                  />
                }
                name="taxNo"
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
                    label="Firma Unvanı"
                    type="text"
                    error={!!errors.firmName}
                  />
                }
                name="firmName"
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
                    label="Web Adresi"
                    type="text"
                    error={!!errors.webAddress}
                  />
                }
                name="webAddress"
                control={control}
                rules={{ required: true }}
                defaultValue=""
              />

              <ControlledAutocomplete
                className="mb-4 w-full"
                options={[{ id: "x", typeName: "Miktat Cento" }, { id: "y", typeName: "Hasan Oruç" }]}
                control={control}
                name="admin1"
                defaultValue={null}
                getOptionLabel={(option) => option.typeName}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="1. Yetkili Kişi"
                    type="text"
                    error={!!errors.liveCity}
                  />
                )}
              />

              <ControlledAutocomplete
                className="mb-4 w-full"
                options={[{ id: "x", typeName: "Miktat Cento" }, { id: "y", typeName: "Hasan Oruç" }]}
                control={control}
                name="admin2"
                defaultValue={null}
                getOptionLabel={(option) => option.typeName}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="2. Yetkili Kişi"
                    type="text"
                    error={!!errors.liveCity}
                  />
                )}
              />

              <ControlledAutocomplete
                className="mb-4 w-full"
                options={[{ id: "x", typeName: "Miktat Cento" }, { id: "y", typeName: "Hasan Oruç" }]}
                control={control}
                name="admin3"
                defaultValue={null}
                getOptionLabel={(option) => option.typeName}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="3. Yetkili Kişi"
                    type="text"
                    error={!!errors.liveCity}
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
                defaultValue=""
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <div>
                {
                  profileImage
                    ? <div style={{ paddingBottom: "0.64rem" }}>
                      <label for="test">
                        <img src={profileImage} alt="profile" style={{ height: "7.74rem", width: "7.74rem", borderRadius: "1rem", objectFit: "cover" }} />
                      </label>
                      <input id='test' type="file" accept='image/*' style={{ display: "none" }} onChange={(e) => setProfileImage(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null)} />
                    </div>
                    : <div style={{ display: "flex", justifyContent: "start" }}>
                      <label for="test">
                        <div style={{ height: "7.74rem", width: "7.74rem", marginBottom: "1rem", borderRadius: "1rem", objectFit: "cover", backgroundColor: "#dedede", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", gap: "2rem" }} >
                          <h4>RESİM</h4>
                          <h6>Seçmek için tıklayınız.</h6>
                        </div>
                      </label>
                      <input id='test' type="file" accept='image/*' style={{ display: "none" }} onChange={(e) => setProfileImage(e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null)} />
                    </div>
                }
              </div>

              <ControlledAutocomplete
                className="mb-4 w-full"
                options={[{ id: "x", typeName: "Gaziantep" }, { id: "y", typeName: "Ankara" }]}
                control={control}
                name="liveCity"
                defaultValue={null}
                getOptionLabel={(option) => option.typeName}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="İl"
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
                defaultValue={null}
                getOptionLabel={(option) => option.typeName}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="İlçe"
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
                defaultValue={null}
                getOptionLabel={(option) => option.typeName}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Mahalle"
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
                defaultValue={null}
                getOptionLabel={(option) => option.typeName}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Sokak"
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
                defaultValue={null}
                getOptionLabel={(option) => option.typeName}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Bina No"
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
                    label="Açıklama"
                    type="text"
                    error={!!errors.description}
                  />
                }
                name="description"
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

          <Button color="primary" variant="contained" type="submit">
            <Icon>save</Icon>
            <span className="pl-2 capitalize">Kayıt Et</span>
          </Button>
        </form>
      </SimpleCard>
    </div>
  );
}

export default connect(null, {})(RegisterFirm)
