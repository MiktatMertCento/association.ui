import { Button, Icon, IconButton, TextField, Tooltip } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import { Breadcrumb, MatxLoading, SimpleCard } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { registerUserType, getLastId } from 'app/services/service';
import { connect } from 'react-redux';
import { ServiceCalling } from 'app/services/serviceCalling';


function EditDialog(props) {
  return (
    <div>
      <Tooltip title="Düzenle" placement="top">
        <IconButton onClick={() => console.log(props)}>
          <Icon style={{ color: 'orange' }}>edit</Icon>
        </IconButton>
      </Tooltip>
    </div>
  )
}

function DeleteDialog() {
  return (
    <div>
      <Tooltip title="Sil" placement="top">
        <IconButton onClick={() => console.log("edit user")}>
          <Icon style={{ color: 'red' }}>delete</Icon>
        </IconButton>
      </Tooltip>
    </div>
  )
}


function UserTypeRegistration(props) {
  const { control, formState: { errors }, setValue } = useForm();
  const { settings } = useSettings();
  const gridRef = useRef();

  const [isLoading, setIsLoading] = useState(true)

  const getParameters = useCallback(
    async (isSaved) => {
      let lastUserId = await ServiceCalling.getLastId(props, 'userTypes');
      setValue("typeCode", parseInt(lastUserId) + 1)

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
    { headerName: "Üye Tipi Numarası", field: "typeCode", minWidth: 130, editable: false, sortable: true, filter: true },
    { headerName: "Üye Tipi Adı", field: "typeName", minWidth: 130, editable: false, sortable: true, filter: true },
    { headerName: "Düzenle", field: "edit", cellRenderer: EditDialog, minWidth: 130, editable: false, sortable: false, filter: false },
    { headerName: "Sil", field: "delete", cellRenderer: DeleteDialog, minWidth: 130, editable: false, sortable: false, filter: false },
  ];

  const [usersRow, setUsersRow] = useState([
    {
      registerNo: "1",
      registerName: "Üye Tipi 1",
    },
    {
      registerNo: "2",
      registerName: "Üye Tipi 2",
    },
    {
      registerNo: "3",
      registerName: "Üye Tipi 3",
    },
  ]);

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
                <form>
                  <Controller
                    render={({ field }) =>
                      <TextField
                        {...field}
                        className="mb-4 w-full"
                        variant="outlined"
                        label="Üye Tipi Numarası"
                        type="text"
                        disabled
                        error={!!errors.typeCode}
                      />
                    }
                    name="typeCode"
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
                    rowData={usersRow}
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
  getLastId
})(UserTypeRegistration);
