import { Button, Icon, TextField, } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import { Breadcrumb, MatxLoading, SimpleCard } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { registerActivityKind, getActivityKindList, getLastId } from 'app/services/service';
import { connect } from 'react-redux';
import { ServiceCalling } from 'app/services/serviceCalling';
import EditActivityKindDialog from './activityKindEditDialog';
import DeleteActivityKindDialog from './activityKindDeleteDialog';


function ActivityKindRegistration(props) {
  const { control, formState: { errors }, setValue, handleSubmit, reset } = useForm();
  const { settings } = useSettings();
  const gridRef = useRef();
  const [activityKindList, setActivityKindList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  let defaultValues = {
    registerNo: '',
    typeName: '',
  }

  const getParameters = useCallback(
    async (isSaved) => {
      let lastUserId = await ServiceCalling.getLastId(props, 'activityKinds');
      setValue("registerNo", parseInt(lastUserId) + 1)

      let activityKindList_ = await ServiceCalling.getActivityKindList(props);
      setActivityKindList(activityKindList_)

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
    { headerName: "Faaliyet Türü Numarası", field: "data.registerNo", minWidth: 130, editable: false, sortable: true, filter: true },
    { headerName: "Faaliyet Türü Adı", field: "data.typeName", minWidth: 130, editable: false, sortable: true, filter: true },
    { headerName: "Düzenle", field: "edit", cellRenderer: EditActivityKindDialog, cellRendererParams: { getParameters: getParameters }, minWidth: 130, editable: false, sortable: false, filter: false },
    { headerName: "Sil", field: "delete", cellRenderer: DeleteActivityKindDialog, cellRendererParams: { getParameters: getParameters }, minWidth: 130, editable: false, sortable: false, filter: false },
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
                  { name: 'Faaliyet Türü Tanımlama' },
                ]}
              />
            </div>

            <div>
              <SimpleCard title="Faaliyet Türü Kayıt">
                <form onSubmit={handleSubmit(userType => props.registerActivityKind(userType, () => { reset(defaultValues); getParameters(); }, () => { }))}>
                  <Controller
                    render={({ field }) =>
                      <TextField
                        {...field}
                        className="mb-4 w-full"
                        variant="outlined"
                        label="Faaliyet Türü Numarası"
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
                        label="Faaliyet Türü Adı"
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
                    rowData={activityKindList}
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
  registerActivityKind,
  getLastId,
  getActivityKindList
})(ActivityKindRegistration);
