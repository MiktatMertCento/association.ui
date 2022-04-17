import { Breadcrumb, MatxLoading, SimpleCard } from 'app/components';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import useSettings from 'app/hooks/useSettings';
import { AgGridReact } from 'ag-grid-react';
import { Icon, IconButton, Tooltip } from '@material-ui/core';
import { ServiceCalling } from 'app/services/serviceCalling';
import { getUserList } from '../../../services/service'
import moment from 'moment'

function EditUserDialog(props) {
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

function DeleteUser() {
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


const EditUser = (props) => {
    const { settings } = useSettings()
    const [isLoading, setIsLoading] = useState(true)
    const [userList, setUserList] = useState([])
    const gridRef = useRef();

    const getParameters = useCallback(
        async () => {
            const userList = await ServiceCalling.getUserList(props)
            setUserList(userList)

            setIsLoading(false);
        }, [props]
    );

    useEffect(() => {
        getParameters();
    }, [getParameters])

    const defaultColDef = {
        editable: true,
        sortable: false,
        flex: 1,
        minWidth: 130,
        filter: false,
        resizable: true,
        lockPosition: true,
    };

    const genelColumnDefinitionOfSchedule = [
        { headerName: "Üye Numarası", field: "data.registerNo", minWidth: 130, editable: false, sortable: true, filter: true },
        { headerName: "TC No", field: "data.idNo", minWidth: 130, editable: false, sortable: true, filter: true },
        { headerName: "Adı Soyadı", valueGetter: (params) => params.data.data.name + " " + params.data.data.surname, minWidth: 130, editable: false, sortable: true, filter: true },
        {
            headerName: "Doğum Tarihi", field: "data.birthday", cellRenderer: (data) => {
                return moment(data.createdAt).format('MM/DD/YYYY')
            }, minWidth: 130, editable: false, sortable: true, filter: true
        },
        { headerName: "Şehir", field: "data.liveCity.typeName", minWidth: 130, editable: false, sortable: true, filter: true },
        { headerName: "Düzenle", field: "edit", cellRenderer: EditUserDialog, minWidth: 130, editable: false, sortable: false, filter: false },
        { headerName: "Sil", field: "delete", cellRenderer: DeleteUser, minWidth: 130, editable: false, sortable: false, filter: false },
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
                                    { name: 'Üye İşlemleri', path: '/' },
                                    { name: 'Üye Düzenle' },
                                ]}
                            />
                        </div>
                        <SimpleCard title="Üye Düzenle">
                            <div className="ag-theme-alpine" style={{ height: 370, width: '100%' }}>
                                <AgGridReact
                                    columnDefs={genelColumnDefinitionOfSchedule}
                                    rowData={userList}
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
            }
        </div>
    );
}

export default connect(null, {
    getUserList
})(EditUser)
