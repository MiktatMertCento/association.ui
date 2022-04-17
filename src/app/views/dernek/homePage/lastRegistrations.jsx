/*import React, { useCallback, useEffect, useState } from 'react'
import {
    Card,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core'
import { connect } from 'react-redux';
import { GetLastStudentList, GetClassList } from '../../../services/service'
import LoadingShimmer from '../Components/LoadingShimmer';
import EditStudent from '../Dialogs/EditStudent';
import manAvatar from '../Assets/Avatars/001-man.svg'
import womanAvatar from '../Assets/Avatars/002-woman.svg'

const LastRegistrations = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [studentList, setStudentList] = useState([])
    const [classList, setClassList] = useState([])

    const GetLastStudentList = useCallback(
        () => {
            props.GetLastStudentList(
                ({ STUDENT_LIST }) => {
                    const status = new Promise((resolve, reject) => {
                        try {
                            resolve('Operation start');
                        }
                        catch {
                            reject('Operation failed')
                        }
                    });
                    status.then(() => {
                        setStudentList(STUDENT_LIST);
                        setIsLoading(false);
                    })
                },
                () => {
                    console.log("failed")
                }
            );
        }, [props]);

    const GetClassList = useCallback(() => {
        props.GetClassList(
            ({ CLASS_LIST }) => {
                const status = new Promise((resolve, reject) => {
                    try {
                        resolve('Operation start');
                    }
                    catch {
                        reject('Operation failed')
                    }
                });
                status.then(() => {
                    setClassList(CLASS_LIST);
                    GetLastStudentList();
                })
            },
            () => {
                console.log("failed")
            }
        );
    }, [props, GetLastStudentList]);

    useEffect(() => {
        GetClassList();
    }, [GetClassList])

    return (
        <Card elevation={3} className="pt-5 px-6 py-5">
            <div className="flex justify-between items-center">
                <span className="card-title">Son Kayıt Edilen Öğrenciler</span>
            </div>
            <div className="w-full overflow-auto">
                <Table className="whitespace-pre">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Cinsiyet</TableCell>
                            <TableCell>No</TableCell>
                            <TableCell className="px-0">Adı</TableCell>
                            <TableCell className="px-0">Soyadı</TableCell>
                            <TableCell className="px-0">Düzenle</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading
                                ? <LoadingShimmer maxWidth={6} row={5} column={5} />
                                : studentList.map((student, index) => (
                                    <TableRow key={index} hover>
                                        <TableCell align="left">
                                            <img src={student.data.Gender === "Erkek" ? manAvatar : womanAvatar} width={40} alt={student.data.Gender} />
                                        </TableCell>
                                        <TableCell className="capitalize" >
                                            {student.data.StudentNo}
                                        </TableCell>
                                        <TableCell className="px-0 capitalize" >
                                            {student.data.Name}
                                        </TableCell>
                                        <TableCell className="px-0 capitalize" >
                                            {student.data.Surname}
                                        </TableCell>
                                        <TableCell className="px-0">
                                            <EditStudent student={student} classList={classList} updated={() => GetLastStudentList()} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}

export default connect(null, { GetLastStudentList, GetClassList })(LastRegistrations)*/