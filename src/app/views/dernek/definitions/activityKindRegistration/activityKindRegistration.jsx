import { Button, Icon, IconButton, TextField, Tooltip } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import { Breadcrumb, SimpleCard } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import React, { useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';

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


export default function ActiviyKindRegistration() {
  const { control, formState: { errors } } = useForm();
  const { settings } = useSettings();
  const gridRef = useRef();

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
    { headerName: "Faaliyet Türü Numarası", field: "registerNo", minWidth: 130, editable: false, sortable: true, filter: true },
    { headerName: "Faaliyet Türü Adı", field: "registerName", minWidth: 130, editable: false, sortable: true, filter: true },
    { headerName: "Düzenle", field: "edit", cellRenderer: EditDialog, minWidth: 130, editable: false, sortable: false, filter: false },
    { headerName: "Sil", field: "delete", cellRenderer: DeleteDialog, minWidth: 130, editable: false, sortable: false, filter: false },
  ];

  const [usersRow, setUsersRow] = useState([
    {
      registerNo: "1",
      registerName: "Faaliyet Türü 1",
    },
    {
      registerNo: "2",
      registerName: "Faaliyet Türü 2",
    },
    {
      registerNo: "3",
      registerName: "Faaliyet Türü 3",
    },
  ]);

  return (
    <div className="m-sm-30">
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
          <form>
            <Controller
              render={({ field }) =>
                <TextField
                  {...field}
                  className="mb-4 w-full"
                  variant="outlined"
                  label="Faaliyet Türü Adı"
                  type="text"
                  error={!!errors.lessonname}
                />
              }
              name="lessonname"
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

        <SimpleCard title="Faaliyet Türleri">
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
  )
}
