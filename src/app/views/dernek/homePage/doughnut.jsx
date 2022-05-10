import React, { useCallback, useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react'
import { useTheme } from '@material-ui/styles'
import { ServiceCalling } from 'app/services/serviceCalling'
import { getAdminList, getUserList } from 'app/services/service'
import { connect } from 'react-redux'

const DoughnutChart = (props) => {
    const theme = useTheme()
    const [option, setOption] = useState({
        legend: {
            show: true,
            itemGap: 20,
            icon: 'circle',
            bottom: 0,
            textStyle: {
                color: theme.palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto',
            },
        },
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        xAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        yAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],

        series: [
            {
                type: 'pie',
                radius: ['45%', '72.55%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                hoverOffset: 5,
                stillShowZeroSum: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center', // shows the description data to center, turn off to show in right side
                        textStyle: {
                            color: theme.palette.text.secondary,
                            fontSize: 13,
                            fontFamily: 'roboto',
                        },
                        formatter: '{a}',
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'normal',
                            // color: "rgba(15, 21, 77, 1)"
                        },
                        formatter: '{b} \n{c} ({d}%)',
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    })


    const getParameters = useCallback(
        async () => {
            let adminList = await ServiceCalling.getAdminList(props)
            let userList = await ServiceCalling.getUserList(props)

            setOption(option => ({ ...option, name: 'Üye Sayısı', series: [{ ...option.series[0], data: [{ value: userList.length, name: `Üyeler - ${userList.length}` }, { value: adminList.length, name: `Yöneticiler - ${adminList.length}` }] }] }))
        },
        [props]
    );

    useEffect(() => {
        getParameters();
    }, [getParameters])



    return (
        <ReactEcharts
            style={{ height: props.height }}
            option={{
                ...option,
                color: [...props.color],
            }}
        />
    )
}

export default connect(null, {
    getAdminList,
    getUserList,
})(DoughnutChart)
