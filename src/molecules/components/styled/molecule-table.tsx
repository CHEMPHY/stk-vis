import * as React from 'react';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import {
    TableProps,
    MoleculeTable as MoleculeTableBase,
} from 'molecules/base/molecule-table';
import {
    MoleculeTableProps,
} from 'Molecules.Molecules'


export const MoleculeTable: React.FunctionComponent<MoleculeTableProps>
    = (props) => <MoleculeTableBase
        container={Container}
        table={Table}
        {...props}
    />;

type Empty= Record<string, unknown>;

const Container: React.FunctionComponent<Empty>
    = (props) => (
        <Paper
            style={{
                height: '100%',
                overflow: 'auto',
            }}
        >
            {props.children}
        </Paper>
    );


const Table: React.FunctionComponent<TableProps>
    = (props) => (
        <MaterialTable
            options={{
                toolbar: true,
                search: false,
                paging: false,
                sorting: false,
                showTitle: false,
                rowStyle: rowData => {
                    return {backgroundColor: (
                        props.selectedRow === rowData.tableData.id
                    )? '#616161' : '#424242'
                }}
            }}
            columns={props.columns}
            data={props.data}
            onRowClick={props.onRowClick}
        />
    );
