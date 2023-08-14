import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomId,
} from '@mui/x-data-grid-generator';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const FullFeaturedCrudGrid = () => {
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

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (taskId) => () => {
    axios.delete(`http://localhost:5125/Tasks/DeleteTask/${taskId}`)
      .then(response => {
        axios.get('http://localhost:5125/Tasks/GetTasks')
          .then(response => {
            console.log('Retrieved data:', response.data);
            setData(response.data);
          })
          .catch(error => console.error('Error fetching data:', error));

        console.log('response', response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

   async function getUserId (name){
    try {
      const response = await axios.get(`http://localhost:5125/Users/GetUserByName?name=${name}`);
      const user = response.data;
      const userId = user.id
      return userId;

    } catch (error) {
      console.error('Error fetching user:', error);
      return 0;
  }
}

async function processRowUpdate(newRow) {
    const UID = await getUserId(newRow.name)
    if (newRow.hasOwnProperty('isNew')) {
      const postData = {
      title: newRow.title,
      description: newRow.description,
      userId: UID,
      endDate:newRow.endDate,
      status: newRow.status
    };
        axios.post(`http://localhost:5125/Tasks/AddTask`, postData)
      .then(response => {
        axios.get('http://localhost:5125/Tasks/GetTasks')
          .then(response => {
            console.log('Retrieved data:', response.data);
            setData(response.data);
          })
          .catch(error => console.error('Error fetching data:', error));

        console.log('response', response.data);
      })
      .catch(error => alert('Error fetching data:', error));
      return newRow;
    } 
    else{
    const updatedRow = { ...newRow, isNew: false };
      const postData = {
      id: newRow.id,
      title: newRow.title,
      description: newRow.description,
      userId: UID,
      endDate:newRow.endDate,
      status: newRow.status
    };

    axios.post(`http://localhost:5125/Tasks/UpdateTask`, postData)
      .then(response => {
        axios.get('http://localhost:5125/Tasks/GetTasks')
          .then(response => {
            console.log('Retrieved data:', response.data);
            setData(response.data);
          })
          .catch(error => console.error('Error fetching data:', error));

        console.log('response', response.data);
      })
      .catch(error => alert('Error fetching data:', error));
    return updatedRow;
  };
    }
    

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  const columns = [
    { field: 'title', headerName: 'Title', width: 220, editable: true },
    {
      field: 'name',
      headerName: 'Assigned To',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: users.map(u => u.name),
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 220,
      type: 'date',
      editable: true,
      valueGetter: (params) => new Date(params.value),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Ready', 'Occuring', 'Unready'],
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 220,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
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
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
        }
      </Box>

  );

}

export default FullFeaturedCrudGrid;