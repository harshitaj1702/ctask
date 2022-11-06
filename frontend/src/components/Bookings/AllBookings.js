import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getData, putData, serverURL } from "../../services/ServerServices";
import { Button, Avatar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function AllBookings() {
  const columns = [
    {
      field: "",
      headerName: "",
      width: 180,
      renderCell: (params) => (
        <>
          {params.row.status == "Booked" ? (
            <Button onClick={() => cancelBooking(params)} aria-label="delete">
              <DeleteIcon /> Cancel Booking
            </Button>
          ) : (
            <></>
          )}
        </>
      ),
    },
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "date",
      headerName: "Booking Date",
      width: 150,
      renderCell: (params) => {
        return <>{new Date(params.row.date).toString().slice(0, 16)}</>;
      },
    },
    { field: "status", headerName: "Status", width: 70 },

    {
      field: "firstname",
      headerName: "Booked By",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            {params.row.firstname} {params.row.lastname}
          </>
        );
      },
    },
    {
      field: "mobileno",
      headerName: "Mobile",
      width: 130,
    },
    { field: "title", headerName: "Title", width: 130 },
    { field: "description", headerName: "Description", width: 150 },
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
      width: 150,
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
  ];
  const [data, setData] = useState([]);

  const fetchAllBookings = async () => {
    const response = await getData("admin/bookings");
    if (response.status) {
      setData(response.data);
    }
  };

  const cancelBooking = async (params) => {
    let body = { status: "Cancelled" };
    const result = await putData("admin/" + params.id, body);
    if (result.status) {
      fetchAllBookings();
    } else{
        alert("server error\ntry again!")
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div>
        <h3>Bookings</h3>
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

export default AllBookings;
