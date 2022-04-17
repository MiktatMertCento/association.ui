/*import React, { useCallback, useEffect, useState } from 'react'
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Card,
} from '@material-ui/core'
import { connect } from 'react-redux';
import { GetLastAnnouncement } from '../../../services/service'
import { useHistory } from 'react-router-dom';
import LoadingShimmer from '../Components/LoadingShimmer';

const LastAnnouncemtAndEvents = (props) => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true)
    const [announcemetList, setAnnouncemetList] = useState([])

    const GetLastAnnouncement = useCallback(
        () => {
            props.GetLastAnnouncement(
                ({ LastAnnouncementList }) => {
                    const status = new Promise((resolve, reject) => {
                        try {
                            resolve('Operation start');
                        }
                        catch {
                            reject('Operation failed')
                        }
                    });
                    status.then(() => {
                        setAnnouncemetList(LastAnnouncementList);
                        setIsLoading(false);
                    })
                },
                () => {
                    console.log("failed")
                }
            );
        }, [props]);


    useEffect(() => {
        GetLastAnnouncement()
    }, [GetLastAnnouncement])


    return (
        <div className="overflow-auto">
            <Card className="mb-6 pt-4 px-3 py-4">
                <div className="card-title">Son Duyurular ve Etkinlikler</div>
                <Table className="whitespace-pre">
                    <TableHead>
                        <TableRow>
                            <TableCell>Başlığı</TableCell>
                            <TableCell>İçeriği</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading
                                ? <LoadingShimmer row={2} column={3} />
                                : announcemetList.map((announcement, index) => (
                                    <TableRow style={{ cursor: "pointer" }} onClick={() => history.push("/duyuru-etkinlik")} key={index} hover>
                                        <TableCell className="capitalize" >
                                            {announcement.data.Title}
                                        </TableCell>
                                        <TableCell className="capitalize" >
                                            {announcement.data.Explanation}
                                        </TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}

export default connect(null, { GetLastAnnouncement })(LastAnnouncemtAndEvents)*/