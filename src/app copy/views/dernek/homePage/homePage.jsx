import React, { Fragment } from 'react'
import { Grid } from '@material-ui/core'
import { Breadcrumb } from 'app/components'
import useSettings from 'app/hooks/useSettings';

const HomePage = () => {
    const { settings } = useSettings();

    return (
        <Fragment>
            <div className="analytics m-sm-30 mt-6">
                <Grid container spacing={3}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <div className="mb-sm-30">
                            <Breadcrumb
                                routeSegments={[
                                    { name: settings.brandName, path: '/' },
                                ]}
                            />
                        </div>
                        Anasayfa
                        {/*<HomePageStats />

                        <LastRegistrations />
                         Top Selling Products 
                        

                        <StatCards2 />

                        <h4 className="card-title text-muted mb-4">
                            Ongoing Projects
                        </h4>
                        <RowCards />
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Card className="px-6 py-4 mb-6">
                            <div className="card-title">Traffic Sources</div>
                            <div className="card-subtitle">Last 30 days</div>
                            <DoughnutChart
                                height="300px"
                                color={[
                                    theme.palette.primary.dark,
                                    theme.palette.primary.main,
                                    theme.palette.primary.light,
                                ]}
                            />
                        </Card>

                        <UpgradeCard />

                        <Campaigns />*/}
                    </Grid>

                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        {/*<LastAnnouncementAndEvents />

                    <LastSurveys />*/}
                    </Grid>
                </Grid>
            </div>
        </Fragment>
    )
}

export default HomePage