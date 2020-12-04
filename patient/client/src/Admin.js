import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { BaseUrl, get } from './api.js'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Admin() {
    const classes = useStyles();

    const [rows, setRows] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(async () => {
        // Update the document title using the browser API
        const res = await get('appointment', {}, {
        })
        setRows(res)
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>name</TableCell>
                        <TableCell>birth</TableCell>
                        <TableCell>address</TableCell>
                        <TableCell>phone</TableCell>
                        <TableCell>email</TableCell>
                        <TableCell>date</TableCell>
                        <TableCell>photo</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.birth}</TableCell>
                            <TableCell>{row.address}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell><a href={BaseUrl + "files/" + row.photo}>{row.photo}</a></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
