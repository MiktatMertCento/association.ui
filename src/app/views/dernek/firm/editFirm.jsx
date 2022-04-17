import { Breadcrumb, SimpleCard } from 'app/components';
import React, { useMemo, useRef, useState } from 'react'
import { connect } from 'react-redux';
import useSettings from 'app/hooks/useSettings';
import { AgGridReact } from 'ag-grid-react';
import { Icon, IconButton, Tooltip } from '@material-ui/core';


function EditFirmDialog() {
    return (
        <div>
            <Tooltip title="Düzenle" placement="top">
                <IconButton onClick={() => console.log("edit user")}>
                    <Icon style={{ color: 'orange' }}>edit</Icon>
                </IconButton>
            </Tooltip>
        </div>
    )
}

function DeleteFirm() {
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


const EditFirm = (props) => {
    const { settings } = useSettings()
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
        { headerName: "Firma Numarası", field: "registerNo", minWidth: 130, editable: false, sortable: true, filter: true },
        { headerName: "Firma Adı", field: "firmTitle", minWidth: 130, editable: false, sortable: true, filter: true },
        { headerName: "Kayıt Tarihi", field: "registerDate", minWidth: 130, editable: false, sortable: true, filter: true },
        { headerName: "Şehir", field: "city", minWidth: 130, editable: false, sortable: true, filter: true },
        { headerName: "İlçe", field: "county", minWidth: 130, editable: false, sortable: true, filter: true },
        { headerName: "Düzenle", field: "edit", cellRenderer: EditFirmDialog, minWidth: 130, editable: false, sortable: false, filter: false },
        { headerName: "Sil", field: "delete", cellRenderer: DeleteFirm, minWidth: 130, editable: false, sortable: false, filter: false },
    ];

    const [usersRow, setUsersRow] = useState([
        { registerNo: "1", firmTitle: "Belsoft", registerDate: "01.01.2000", city: "İstanbul", county: "Küçükçekmece" },
    ]);

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: settings.brandName, path: '/' },
                        { name: 'Üye İşlemleri', path: '/' },
                        { name: 'Üye Düzenle' },
                    ]}
                />
            </div>
            <SimpleCard title="Üye Düzenle">
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
    );
}

export default connect(null, {})(EditFirm)
