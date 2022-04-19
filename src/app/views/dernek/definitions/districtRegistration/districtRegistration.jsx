import { Button, Grid, Icon, TextField, } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import { Breadcrumb, MatxLoading, SimpleCard } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { registerDistrict, getDistrictList, getLastId } from 'app/services/service';
import { connect } from 'react-redux';
import { ServiceCalling } from 'app/services/serviceCalling';
import EditDistrictDialog from './districtEditDialog';
import DeleteDistrictDialog from './districtDeleteDialog';
import counties from '../../assets/json/Counties.json';
import cities from '../../assets/json/Cities.json';
import ControlledAutocomplete from '../../components/ControlledAutocomplete';


function DistrictRegistration(props) {
  const { control, formState: { errors }, setValue, handleSubmit, reset, watch } = useForm();
  const { settings } = useSettings();
  const gridRef = useRef();
  const [districtList, setDistrictList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  let defaultValues = {
    registerNo: '',
    typeName: '',
    city: null,
    county: null,
  }

  const getParameters = useCallback(
    async (isSaved) => {
      let lastUserId = await ServiceCalling.getLastId(props, 'districts');
      setValue("registerNo", parseInt(lastUserId) + 1)

      let districtList_ = await ServiceCalling.getDistrictList(props);
      setDistrictList(districtList_)

      if (!isSaved) {

      }

      setIsLoading(false);
    },
    [props, setValue]
  );

  useEffect(() => {
    getParameters();
  }, [getParameters])

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: false,
      flex: 1,
      minWidth: 130,
      filter: false,
      resizable: true,
      lockPosition: true,
    };
  }, [])


  const genelColumnDefinitionOfSchedule = [
    { headerName: "Mahalle/Köy Numarası", field: "data.registerNo", minWidth: 130, editable: false, sortable: true, filter: true },
    { headerName: "Mahalle/Köy Adı", field: "data.typeName", minWidth: 130, editable: false, sortable: true, filter: true },
    { headerName: "Düzenle", field: "edit", cellRenderer: EditDistrictDialog, cellRendererParams: { getParameters: getParameters }, minWidth: 130, editable: false, sortable: false, filter: false },
    { headerName: "Sil", field: "delete", cellRenderer: DeleteDistrictDialog, cellRendererParams: { getParameters: getParameters }, minWidth: 130, editable: false, sortable: false, filter: false },
  ];

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
                  { name: 'Mahalle/Köy Tanımlama' },
                ]}
              />
            </div>

            <div>
              <SimpleCard title="Mahalle/Köy Kayıt">
                <form onSubmit={handleSubmit(district => props.registerDistrict(district, () => { reset(defaultValues); getParameters(); }, () => { }))}>
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
                        defaultValue=""
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
                        defaultValue=""
                      />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>

                      <ControlledAutocomplete
                        className="mb-4 w-full"
                        options={cities}
                        control={control}
                        name="city"
                        defaultValue={null}
                        required={true}
                        getOptionLabel={(option) => option.il}
                        getOptionSelected={(option, value) => option.id === value.id}
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
                        defaultValue={null}
                        required={true}
                        disabled={!watch("city") ? true : false}
                        getOptionLabel={(option) => option.ilce}
                        getOptionSelected={(option, value) => option.id === value.id}
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

                  <Button color="primary" variant="contained" type="submit">
                    <Icon>save</Icon>
                    <span className="pl-2 capitalize">Kayıt Et</span>
                  </Button>
                </form>
              </SimpleCard>

              <div className="py-2" />

              <SimpleCard title="Üye Tipleri">
                <div className="ag-theme-alpine" style={{ height: 370, width: '100%' }}>
                  <AgGridReact
                    columnDefs={genelColumnDefinitionOfSchedule}
                    rowData={districtList}
                    defaultColDef={defaultColDef}
                    enableCellChangeFlash={true}
                    enableCellTextSelection={true}
                    enableCellExpressions={true}
                    enableGroupEdit={true}
                    enableRangeHandle={true}
                    rowSelection={'multiple'}
                    ref={gridRef}
                    animateRows={true}
                  >
                  </AgGridReact>
                </div>
              </SimpleCard>
            </div>
          </div>
      }
    </div>
  )
}

export default connect(null, {
  registerDistrict,
  getLastId,
  getDistrictList
})(DistrictRegistration);
