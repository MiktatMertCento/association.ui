import React from 'react'
import { Grid } from '@material-ui/core'
import { connect } from 'react-redux';
import { GetStudentList, GetTeacherList } from '../../../services/service'

const StatCards = (props) => {
    return (
        <Grid container spacing={3} className="mb-3">
            hocam bu bozulmuş
        </Grid>
    )
}

export default connect(null, { GetStudentList, GetTeacherList })(StatCards)