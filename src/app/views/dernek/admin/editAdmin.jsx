import { Breadcrumb, MatxLoading, SimpleCard } from 'app/components';
import React, { useCallback, useEffect,  useRef, useState } from 'react'
import { connect } from 'react-redux';
import useSettings from 'app/hooks/useSettings';
import { AgGridReact } from 'ag-grid-react';
import { getAdminList } from '../../../services/service'
import EditAdminDialog from './editAdminDialog'
import DeleteAdminDialog from './deleteAdminDialog';
import { ServiceCalling } from 'app/services/serviceCalling';


const EditAdmin = (props) => {
    const { settings } = useSettings()
    const [isLoading, setIsLoading] = useState(true)
    const [adminList, setAdminList] = useState([])
    const gridRef = useRef();

    const getParameters = useCallback(
        async () => {
            const adminList = await ServiceCalling.getAdminList(props)
            setAdminList(adminList)

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
    }

    const genelColumnDefinitionOfSchedule = [
        { headerName: "Üye Numarası", field: "data.registerNo", minWidth: 130, editable: false, sortable: true, filter: true },
        { headerName: "TC No", field: "data.idNo", minWidth: 130, editable: false, sortable: true, filter: true },
        { headerName: "Adı Soyadı", valueGetter: (params) => params.data.data.name + " " + params.data.data.surname, minWidth: 130, editable: false, sortable: true, filter: true },
        { headerName: "Düzenle", field: "edit", cellRenderer: EditAdminDialog, cellRendererParams: { getAdminList: getParameters }, minWidth: 130, editable: false, sortable: false, filter: false },
        { headerName: "Sil", field: "delete", cellRenderer: DeleteAdminDialog, cellRendererParams: { getAdminList: getParameters }, minWidth: 130, editable: false, sortable: false, filter: false },
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
                                    { name: 'Admin İşlemleri', path: '/' },
                                    { name: 'Admin Düzenle' },
                                ]}
                            />
                        </div>
                        <SimpleCard title="Admin Düzenle">
                            <div className="ag-theme-alpine" style={{ height: 370, width: '100%' }}>
                                <AgGridReact
                                    columnDefs={genelColumnDefinitionOfSchedule}
                                    rowData={adminList}
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
    getAdminList
})(EditAdmin)
