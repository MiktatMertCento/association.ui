import { Button, Icon, TextField, } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import { Breadcrumb, MatxLoading, SimpleCard } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { registerForeignLanguage, getForeignLanguageList, getLastId } from 'app/services/service';
import { connect } from 'react-redux';
import { ServiceCalling } from 'app/services/serviceCalling';
import EditForeignLanguageDialog from './foreignLanguageEditDialog';
import DeleteForeignLanguageDialog from './foreignLanguageDeleteDialog';


function ForeignLanguageRegistration(props) {
  const { control, formState: { errors }, setValue, handleSubmit, reset } = useForm();
  const { settings } = useSettings();
  const gridRef = useRef();
  const [foreignLanguage, setForeignLanguage] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  let defaultValues = {
    registerNo: '',
    typeName: '',
  }

  const getParameters = useCallback(
    async (isSaved) => {
      let lastUserId = await ServiceCalling.getLastId(props, 'foreignLanguages');
      setValue("registerNo", parseInt(lastUserId) + 1)

      let foreignLanguageList_ = await ServiceCalling.getForeignLanguageList(props);
      setForeignLanguage(foreignLanguageList_)

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
    { headerName: "Yabancı Dil Numarası", field: "data.registerNo", minWidth: 130, editable: false, sortable: true, filter: true },
    { headerName: "Yabancı Dil Adı", field: "data.typeName", minWidth: 130, editable: false, sortable: true, filter: true },
    { headerName: "Düzenle", field: "edit", cellRenderer: EditForeignLanguageDialog, cellRendererParams: { getParameters: getParameters }, minWidth: 130, editable: false, sortable: false, filter: false },
    { headerName: "Sil", field: "delete", cellRenderer: DeleteForeignLanguageDialog, cellRendererParams: { getParameters: getParameters }, minWidth: 130, editable: false, sortable: false, filter: false },
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
                  { name: 'Yabancı Dil Tanımlama' },
                ]}
              />
            </div>

            <div>
              <SimpleCard title="Yabancı Dil Kayıt">
                <form onSubmit={handleSubmit(job => props.registerForeignLanguage(job, () => { reset(defaultValues); getParameters(); }, () => { }))}>
                  <Controller
                    render={({ field }) =>
                      <TextField
                        {...field}
                        className="mb-4 w-full"
                        variant="outlined"
                        label="Yabancı Dil Numarası"
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
                        label="Yabancı Dil Adı"
                        type="text"
                        error={!!errors.typeName}
                      />
                    }
                    name="typeName"
                    control={control}
                    rules={{ required: true }}
                    defaultValue=""
                  />

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
                    rowData={foreignLanguage}
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
  registerForeignLanguage,
  getLastId,
  getForeignLanguageList
})(ForeignLanguageRegistration);
