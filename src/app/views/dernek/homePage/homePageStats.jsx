import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import { ServiceCalling } from 'app/services/serviceCalling';
import { getUserList } from '../../../services/service'
import moment from 'moment'

const HomePageStats = (props) => {
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
       // { headerName: "Düzenle", field: "edit", cellRenderer: EditUserDialog, cellRendererParams: { getUserList: getParameters }, minWidth: 130, editable: false, sortable: false, filter: false },
       // { headerName: "Sil", field: "delete", cellRenderer: DeleteUserDialog, cellRendererParams: { getUserList: getParameters }, minWidth: 130, editable: false, sortable: false, filter: false },
    ];

    return (
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
    )
}

export default connect(null, {
    getUserList
})(HomePageStats)