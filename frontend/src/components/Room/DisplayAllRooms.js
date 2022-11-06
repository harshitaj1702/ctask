import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { deleteData, getData, serverURL } from "../../services/ServerServices";
import { IconButton, Button, Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from "react-router-dom";

function DisplayAllRooms() {
  const navigate = useNavigate();
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 100,
    },
    {
      field: "offerprice",
      headerName: "Offer Price",
      type: "number",
      width: 100,
    },
    {
      field: "pictures",
      headerName: "Pictures",
      width: 275,
      renderCell: (params) => {
        const pictures = params.row.pictures.split(",");
        return (
          <>
            {pictures.map((item) => (
              <Avatar src={`${serverURL}/images/${item}`} />
            ))}
          </>
        );
      },
    },
    {
      field: "",
      headerName: "",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => navigate("/dashboard/room/" + params.id)}
            aria-label="Edit"
          >
            <CreateIcon />
          </IconButton>
          <IconButton onClick={handleDelete(params)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
  const [data, setData] = useState([]);

  const handleDelete = (params) => async () => {
    const response = await deleteData("rooms/"+params.id);
    if (response.status) {
      fetchAllRooms();
    } else {
      alert(response.message);
    }
  };

  const fetchAllRooms = async () => {
    const response = await getData("rooms");
    if (response.status) {
      setData(response.data);
    }
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div>
        <h3>Rooms Management</h3>
        <Button onClick={() => navigate("/dashboard/addroom")}>Add Room</Button>
      </div>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
      />
    </div>
  );
}

export default DisplayAllRooms;
