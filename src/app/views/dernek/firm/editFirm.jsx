import { Breadcrumb, MatxLoading, SimpleCard } from 'app/components';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { connect } from 'react-redux';
import useSettings from 'app/hooks/useSettings';
import { AgGridReact } from 'ag-grid-react';
import { Icon, IconButton, Tooltip } from '@material-ui/core';
import { ServiceCalling } from 'app/services/serviceCalling';
import { getFirmList } from '../../../services/service'
import moment from 'moment';
import EditFirmDialog from './editFirmDialog';
import DeleteFirmDialog from './deleteFirmDialog';

const EditFirm = (props) => {
    const { settings } = useSettings()
    const [isLoading, setIsLoading] = useState(true)
    const [firmList, setFirmList] = useState([])
    const gridRef = useRef();

    const getParameters = useCallback(
        async () => {
            const firmList = await ServiceCalling.getFirmList(props)
            setFirmList(firmList)

            setIsLoading(false);
        }, [props]
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
        { headerName: "Firma Numarası", field: "data.registerNo", minWidth: 130, editable: false, sortable: true, filter: true },
        { headerName: "Firma Adı", field: "data.firmName", minWidth: 130, editable: false, sortable: true, filter: true },
        {
            headerName: "Kayıt Tarihi", field: "data.registerDate", cellRenderer: (data) => {
                return moment(data.createdAt).format('MM/DD/YYYY')
            }, minWidth: 130, editable: false, sortable: true, filter: true
        }, { headerName: "Şehir", field: "data.city", minWidth: 130, editable: false, sortable: true, filter: true },
        { headerName: "İlçe", field: "data.county", minWidth: 130, editable: false, sortable: true, filter: true },
        { headerName: "Düzenle", field: "edit", cellRenderer: EditFirmDialog, cellRendererParams: { getFirmList: getParameters }, minWidth: 130, editable: false, sortable: false, filter: false },
        { headerName: "Sil", field: "delete", cellRenderer: DeleteFirmDialog, cellRendererParams: { getFirmList: getParameters }, minWidth: 130, editable: false, sortable: false, filter: false },
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
                                    rowData={firmList}
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
    getFirmList
})(EditFirm)
