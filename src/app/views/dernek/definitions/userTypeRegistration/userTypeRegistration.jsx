import { Button, Icon, IconButton, TextField, Tooltip } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import { Breadcrumb, MatxLoading, SimpleCard } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { registerUserType, getUserTypeList, getLastId } from 'app/services/service';
import { connect } from 'react-redux';
import { ServiceCalling } from 'app/services/serviceCalling';
import EditUserTypeDialog from './userTypeEditDialog';
import DeleteUserTypeDialog from './userTypeDeleteDialog';


function UserTypeRegistration(props) {
  const { control, formState: { errors }, setValue, handleSubmit, reset } = useForm();
  const { settings } = useSettings();
  const gridRef = useRef();
  const [userTypeList, setUserTypeList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  let defaultValues = {
    registerNo: '',
    typeName: '',
  }

  const getParameters = useCallback(
    async (isSaved) => {
      let lastUserId = await ServiceCalling.getLastId(props, 'userTypes');
      setValue("registerNo", parseInt(lastUserId) + 1)

      let userTypeList_ = await ServiceCalling.getUserTypeList(props);
      setUserTypeList(userTypeList_)

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
    { headerName: "Üye Tipi Numarası", field: "data.registerNo", minWidth: 130, editable: false, sortable: true, filter: true },
    { headerName: "Üye Tipi Adı", field: "data.typeName", minWidth: 130, editable: false, sortable: true, filter: true },
    { headerName: "Düzenle", field: "edit", cellRenderer: EditUserTypeDialog, cellRendererParams: { getParameters: getParameters }, minWidth: 130, editable: false, sortable: false, filter: false },
    { headerName: "Sil", field: "delete", cellRenderer: DeleteUserTypeDialog, cellRendererParams: { getParameters: getParameters }, minWidth: 130, editable: false, sortable: false, filter: false },
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
                  { name: 'Üye Tipi Tanımlama' },
                ]}
              />
            </div>

            <div>
              <SimpleCard title="Üye Tipi Kayıt">
                <form onSubmit={handleSubmit(userType => props.registerUserType(userType, () => { reset(defaultValues); getParameters(); }, () => { }))}>
                  <Controller
                    render={({ field }) =>
                      <TextField
                        {...field}
                        className="mb-4 w-full"
                        variant="outlined"
                        label="Üye Tipi Numarası"
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
                        label="Üye Tipi Adı"
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
                    rowData={userTypeList}
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
  registerUserType,
  getLastId,
  getUserTypeList
})(UserTypeRegistration);
