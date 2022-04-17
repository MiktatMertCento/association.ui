import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import '../headenglish.css'
import clsx from "clsx";
import useSettings from "app/hooks/useSettings";

const LoadingShimmer = (props) => {
    const { settings } = useSettings();
    const themeType = settings.themes[settings.activeTheme].palette.type;
    const maxWidth = props.maxWidth ?? 8;
    var rows = [];
    for (let i = 0; i < props.row; i++) {
        rows.push(
            <TableCell key={i}>
                <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                    <div style={{ width: `${maxWidth}rem`, height: "1rem" }} className={clsx(themeType, "rounded")} />
                    <div style={{ width: `${maxWidth - 2}rem`, height: "1rem" }} className={clsx(themeType, "rounded")} />
                </div>
            </TableCell >
        );
    }

    var columns = [];
    for (var i = 0; i < props.column; i++) {
        columns.push(
            <TableRow key={i}>
                {rows}
            </TableRow>
        );
    }

    return (<>{
        props.isOne
            ? <div style={{ width: `${maxWidth}rem`, height: "1rem" }} className={clsx(themeType, "rounded")} />
            : props.isSquare
                ? <div style={{ height: "100px", width: "150px" }} className={clsx(themeType)} />
                : columns
    }</>);
}

export default LoadingShimmer