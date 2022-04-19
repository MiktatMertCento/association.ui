import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Icon, IconButton, TextField, Tooltip } from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { updateDistrict } from '../../../../services/service'

const EditDistrictDialog = (props) => {
    const [open, setOpen] = useState(false)
    const { handleSubmit, control, formState: { errors } } = useForm();
    const district = props.data.data

    return (
        <div>
            <Tooltip title="Düzenle" placement="top">
                <IconButton onClick={() => setOpen(true)}>
                    <Icon style={{ color: 'orange' }}>edit</Icon>
                </IconButton>
            </Tooltip>
            {
                open &&
                <Dialog
                    fullWidth={true}
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {district.typeName} Düzenle
                    </DialogTitle>
                    <DialogContent>
                        <Controller
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    className="mb-4 w-full"
                                    variant="outlined"
                                    label="Mahalle/Köy Numarası"
                                    type="text"
                                    disabled
                                    error={!!errors.registerNo}
                                />
                            }
                            name="registerNo"
                            control={control}
                            rules={{ required: true }}
                            defaultValue={district.registerNo}
                        />

                        <Controller
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    className="mb-4 w-full"
                                    variant="outlined"
                                    label="Mahalle/Köy Adı"
                                    type="text"
                                    error={!!errors.typeName}
                                />
                            }
                            name="typeName"
                            control={control}
                            rules={{ required: true }}
                            defaultValue={district.typeName}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={() => setOpen(false)}>
                            Hayır
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit((district) => props.updateDistrict(district, props.data.id, () => { setOpen(false); props.getParameters(); }, () => { }))} autoFocus>
                            Evet
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </div >
    )
}

export default connect(null, {
    updateDistrict
})(EditDistrictDialog)
