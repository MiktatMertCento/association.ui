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
import { GetLastSurveys } from '../../../services/service'
import LoadingShimmer from '../Components/LoadingShimmer';
import SurveyResult from '../Dialogs/SurveyResult';

const LastSurveys = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [surveyList, setSurveyList] = useState([])

    const GetLastSurveys = useCallback(
        () => {
            props.GetLastSurveys(
                ({ LastSurveyList }) => {
                    const status = new Promise((resolve, reject) => {
                        try {
                            resolve('Operation start');
                        }
                        catch {
                            reject('Operation failed')
                        }
                    });
                    status.then(() => {
                        setSurveyList(LastSurveyList);
                        setIsLoading(false);
                    })
                },
                () => {
                    console.log("failed")
                }
            );
        }, [props]);


    useEffect(() => {
        GetLastSurveys()
    }, [GetLastSurveys])

    return (
        <div className="overflow-auto">
            <Card className="mb-6 pt-4 px-3 py-4">
                <div className="card-title">Son Anketler</div>
                <Table className="whitespace-pre">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'>Anket Başlığı</TableCell>
                            <TableCell align='right'>Anket Sonuçları</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading
                                ? <LoadingShimmer row={2} column={3} />
                                : surveyList.map((survey, index) => (
                                    <TableRow style={{ cursor: "pointer" }} key={index} hover>
                                        <TableCell align='left' className="capitalize" >
                                            {survey.data.SurveyName}
                                        </TableCell>
                                        <TableCell align='right'>
                                            <SurveyResult survey={survey} />
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

export default connect(null, { GetLastSurveys })(LastSurveys)*/