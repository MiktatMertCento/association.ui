/*import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Grid, Card, Icon, IconButton, Tooltip } from '@material-ui/core'
import { connect } from 'react-redux';
import { GetStudentList, GetTeacherList, GetClassList, GetAnnouncement } from '../../../services/service'
import { makeStyles } from '@material-ui/core/styles'
import LoadingShimmer from '../Components/LoadingShimmer';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    icon: {
        fontSize: '44px',
        opacity: 0.6,
        color: palette.primary.main,
    },
}))

const HomePageStats = (props) => {
    const history = useHistory();
    const [takenData, setTakenData] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [studentList, setStudentList] = useState(0)
    const [teacherList, setTeacherList] = useState(0)
    const [classList, setClassList] = useState(0)
    const [announcementList, setAnnouncementList] = useState(0)

    const classes = useStyles()

    const GetStudentList = useCallback(
        () => {
            props.GetStudentList(
                ({ STUDENT_LIST_LENGTH }) => {
                    const status = new Promise((resolve, reject) => {
                        try {
                            resolve('Operation start');
                        }
                        catch {
                            reject('Operation failed')
                        }
                    });
                    status.then(() => {
                        setStudentList(STUDENT_LIST_LENGTH);
                        setTakenData(takenData => takenData + 1);
                    })
                },
                () => {
                    console.log("failed")
                }
            );
        }, [props]);

    const GetTeacherList = useCallback(
        () => {
            props.GetTeacherList(
                ({ TEACHER_LIST_LENGTH }) => {
                    const status = new Promise((resolve, reject) => {
                        try {
                            resolve('Operation start');
                        }
                        catch {
                            reject('Operation failed')
                        }
                    });
                    status.then(() => {
                        setTeacherList(TEACHER_LIST_LENGTH);
                        setTakenData(takenData => takenData + 1);
                    })
                },
                () => {
                    console.log("failed")
                }
            );
        }, [props]);

    const GetClassList = useCallback(
        () => {
            props.GetClassList(
                ({ CLASS_LIST_LENGTH }) => {
                    const status = new Promise((resolve, reject) => {
                        try {
                            resolve('Operation start');
                        }
                        catch {
                            reject('Operation failed')
                        }
                    });
                    status.then(() => {
                        setClassList(CLASS_LIST_LENGTH);
                        setTakenData(takenData => takenData + 1);
                    })
                },
                () => {
                    console.log("failed")
                }
            );
        }, [props]);

    const GetAnnouncement = useCallback(
        () => {
            props.GetAnnouncement(
                ({ AnnouncementListLength }) => {
                    const status = new Promise((resolve, reject) => {
                        try {
                            resolve('Operation start');
                        }
                        catch {
                            reject('Operation failed')
                        }
                    });
                    status.then(() => {
                        setAnnouncementList(AnnouncementListLength);
                        setTakenData(takenData => takenData + 1);
                    })
                },
                () => {
                    console.log("failed")
                }
            );
        }, [props]);


    useEffect(() => {
        GetStudentList();
        GetTeacherList();
        GetClassList();
        GetAnnouncement();
    }, [GetStudentList, GetTeacherList, GetClassList, GetAnnouncement]);

    useEffect(() => {
        if (takenData === 4) {
            setIsLoading(false);
        }
    }, [takenData])


    return (

        <Grid container spacing={3} className="mb-3">
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>group</Icon>
                        <div className="ml-3">
                            <small className="text-muted">Öğrenci Sayısı</small>
                            <h6 className="m-0 mt-1 text-primary font-medium">
                                {isLoading ? <LoadingShimmer isOne maxWidth={6} /> : studentList}
                            </h6>
                        </div>
                    </div>
                    <Tooltip title="Detayları Gör" placement="top">
                        <IconButton onClick={() => history.push("/ogrenci-listesi")}>
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>store</Icon>
                        <div className="ml-3">
                            <small className="text-muted">Sınıf Sayısı</small>
                            <h6 className="m-0 mt-1 text-primary font-medium">
                                {isLoading ? <LoadingShimmer isOne maxWidth={6} /> : classList}
                            </h6>
                        </div>
                    </div>
                    <Tooltip title="Detayları Gör" placement="top">
                        <IconButton onClick={() => history.push("/sinif-tanimla")}>
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>group</Icon>
                        <div className="ml-3">
                            <small className="text-muted">Öğretmen Sayısı</small>
                            <h6 className="m-0 mt-1 text-primary font-medium">
                                {isLoading ? <LoadingShimmer isOne maxWidth={6} /> : teacherList}
                            </h6>
                        </div>
                    </div>
                    <Tooltip title="Detayları Gör" placement="top">
                        <IconButton onClick={() => history.push("/ogretmen-listesi")}>
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card
                    className="flex flex-wrap justify-between items-center p-sm-24 bg-paper"
                    elevation={6}
                >
                    <div className="flex items-center">
                        <Icon className={classes.icon}>campaign</Icon>
                        <div className="ml-3">
                            <small className="text-muted">Duyuru ve Etkinlik Sayısı</small>
                            <h6 className="m-0 mt-1 text-primary font-medium">
                                {isLoading ? <LoadingShimmer isOne maxWidth={6} /> : announcementList}
                            </h6>
                        </div>
                    </div>
                    <Tooltip title="Detayları Gör" placement="top">
                        <IconButton onClick={() => history.push("/duyuru-etkinlik")}>
                            <Icon>arrow_right_alt</Icon>
                        </IconButton>
                    </Tooltip>
                </Card>
            </Grid>
        </Grid>
    )
}

export default connect(null, { GetStudentList, GetTeacherList, GetClassList, GetAnnouncement })(HomePageStats)*/