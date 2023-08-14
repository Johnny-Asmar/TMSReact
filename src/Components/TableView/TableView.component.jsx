import * as React from 'react';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  DataGrid
} from '@mui/x-data-grid';
import styled from 'styled-components';


const TableView = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5125/Tasks/GetTasks')
      .then(response => {
        console.log('Retrieved data:', response.data);
        setData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const [rows, setRows] = React.useState();
  const [users, setUsers] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  // get Users
  useEffect(() => {
    axios.get('http://localhost:5125/Users/GetUsers')
      .then(response => {
      console.log('Retrieved users:', response.data);
      setUsers(response.data)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  useEffect(() => {
    console.log('use effect 1')
    setRows(data)
  }, [data])

    
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  const columns = [
    { field: 'title', headerName: 'Title', width: 220, editable: false },
    {
      field: 'description',
      headerName: 'Description',
      width: 220,
      editable: false,
    },

    {
      field: 'name',
      headerName: 'Assigned To',
      width: 220,
      editable: false,
      type: 'singleSelect',
      valueOptions: users.map(u => u.name),
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      type: 'date',
      width: 220,
      editable: false,
      valueGetter: (params) => new Date(params.value),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 220,
      editable: false,
      type: 'singleSelect',
      valueOptions: ['Ready', 'Occuring', 'Unready'],
    }
  ];

  const TableContent = styled.div``


  return (
    <TableContent>
      <Box
        sx={{
          height: 600,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          }
        }}
      >
        {rows &&
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
        }
      </Box>
      </TableContent>
  );

}

export default TableView;