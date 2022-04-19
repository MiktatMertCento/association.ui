import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Icon, IconButton, Tooltip } from '@material-ui/core'
import { deleteForeignLanguage } from 'app/services/service'
import { connect } from 'react-redux'

function DeleteForeignLanguageDialog(props) {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <Tooltip title="Sil" placement="top">
                <IconButton onClick={() => setOpen(true)}>
                    <Icon style={{ color: '#e53935' }}>delete</Icon>
                </IconButton>
            </Tooltip>

            {
                open &&
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {"Silmek istediğinize emin misiniz?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            Bu veriyi sildiğinizde geri getirmek mümkün olmayacaktır
                            yine de silmek istediğinize emin misiniz?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>
                            Hayır
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => { props.deleteForeignLanguage(props.data.id, () => { setOpen(false); props.getParameters(); }, () => { }) }} autoFocus>
                            Evet
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </div >
    )
}

export default connect(null, {
    deleteForeignLanguage
})(DeleteForeignLanguageDialog)

