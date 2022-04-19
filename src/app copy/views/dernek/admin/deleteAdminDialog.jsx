import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Grid, Icon, IconButton, TextField, Tooltip } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import DateFnsUtils from '@date-io/date-fns'
import trLocale from "date-fns/locale/tr";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { deleteAdmin } from 'app/services/service'
import { connect } from 'react-redux'

function DeleteAdminDialog(props) {
    const { handleSubmit, control, formState: { errors } } = useForm();
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

                        <Grid container spacing={6}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <Controller
                                    render={({ field }) =>
                                        <TextField
                                            {...field}
                                            className="mb-4 w-full"
                                            variant="outlined"
                                            label="Çıkış Nedeni"
                                            type="text"
                                            error={!!errors.exitReason}
                                        />
                                    }
                                    name="exitReason"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=""
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={trLocale}>
                                    <Controller
                                        name="exitDate"
                                        control={control}
                                        defaultValue={new Date()}
                                        render={({ field: { ref, ...rest } }) => (
                                            <KeyboardDatePicker
                                                className="mb-4 w-full"
                                                format="dd.MM.yyyy"
                                                margin="none"
                                                id="mui-pickers-date"
                                                label="Çıkış Tarihi"
                                                inputVariant="outlined"
                                                type="text"
                                                autoOk={true}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                                okLabel="Tarih Seç"
                                                cancelLabel="Vazgeç"
                                                {...rest}
                                                error={!!errors.exitDate}
                                            />
                                        )}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>
                            Hayır
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit(reason => props.deleteAdmin(props.data.id, reason, () => { setOpen(false); props.getAdminList(); }, () => { }))} autoFocus>
                            Evet
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </div >
    )
}

export default connect(null, {
    deleteAdmin
})(DeleteAdminDialog)

