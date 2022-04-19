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
import { registerFirm, getLastId } from 'app/services/service';
import { ServiceCalling } from '../../../services/serviceCalling';

const RegisterFirm = (props) => {
  const { settings } = useSettings()
  const [isLoading, setIsLoading] = useState(true)
  const { getValues, setValue, handleSubmit, control, reset, formState: { errors }, watch } = useForm();
  const profilePictureRef = useRef()

  const getParameters = useCallback(
    async (isSaved) => {
      let lastUserId = await ServiceCalling.getLastId(props, 'firms');
      setValue("registerNo", parseInt(lastUserId) + 1)

      if (!isSaved) {

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
    registerDate: new Date(),
    taxNo: "",
    firmName: "",
    webAddress: "",
    admin1: null,
    admin2: null,
    admin3: null,
    businessPhone: "",
    profileImage: undefined,
    city: null,
    county: null,
    district: null,
    street: null,
    buildingNumber: "",
    description: "",
    mobilePhone: "",
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
                  { name: 'Firma İşlemleri', path: '/' },
                  { name: 'Firma Kayıt' },
                ]}
              />
            </div>
            <SimpleCard title="Firma Kayıt">
              <form onSubmit={handleSubmit((firm) => { props.registerFirm(firm, () => { reset(defaultValues); getParameters(true); }, () => console.log("başarısız")) })}>
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
                      defaultValue=""
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
                      rules={{ required: false }}
                      defaultValue=""
                    />

                    <ControlledAutocomplete
                      className="mb-4 w-full"
                      options={[{ id: "x", typeName: "Miktat Cento" }, { id: "y", typeName: "Hasan Oruç" }]}
                      control={control}
                      name="admin1"
                      defaultValue={null}
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
                      defaultValue={null}
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
                      defaultValue={null}
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
                      options={[{ id: "x", typeName: "Gaziantep" }, { id: "y", typeName: "Ankara" }]}
                      control={control}
                      name="city"
                      defaultValue={null}
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
                      defaultValue={null}
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
                      defaultValue={null}
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
                      defaultValue={null}
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
                      rules={{ required: false }}
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
      }
    </div >
  );
}

export default connect(null, {
  registerFirm,
  getLastId
})(RegisterFirm)
