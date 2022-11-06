import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useNavigate, useParams } from "react-router-dom";
import { postData, putData, getData } from "../../services/ServerServices";

function EditRooms() {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offerprice, setOfferprice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      title,
      description,
      price,
      offerprice,
    };
    const response = await putData("rooms/" + params.id, body);
    if (response.status) {
      navigate("/dashboard/room");
    }
  };

  const fetchRooms = async () => {
    const response = await getData("rooms/" + params.id);
    if (response.status) {
      setTitle(response.data.title);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setOfferprice(response.data.offerprice);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "50%", marginTop: "10px" }}>
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper variant="outlined" square style={{ padding: "20px" }}>
              <h3>Edit Room</h3>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined"
                    label="Description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined"
                    label="Price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="outlined"
                    label="Offer Price"
                    onChange={(e) => setOfferprice(e.target.value)}
                    value={offerprice}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit">Submit</Button>
                </Grid>
              </Grid>
            </Paper>
          </LocalizationProvider>
        </form>
      </div>
    </div>
  );
}

export default EditRooms;
