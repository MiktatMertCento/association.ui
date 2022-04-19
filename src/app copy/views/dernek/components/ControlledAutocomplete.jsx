import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Controller } from "react-hook-form";

export default function ControlledAutocomplete({ className, control, options, onChange, disabled = false, disableClearable = false, getOptionLabel, getOptionSelected, renderInput, name, defaultValue, required = false }) {
    return (
        <Controller
            render={({ field }) => (
                <Autocomplete
                    {...field}
                    options={options}
                    disabled={disabled}
                    className={className}
                    getOptionLabel={getOptionLabel}
                    getOptionSelected={getOptionSelected}
                    renderInput={renderInput}
                    disableClearable={disableClearable}
                    noOptionsText="Seçenek bulunamadı."
                    onChange={(_, data) => { field.onChange(data); onChange && onChange(data); }}
                />
            )}
            name={name}
            control={control}
            rules={{
                required: required,
            }}
            defaultValue={defaultValue}
        />
    );
}