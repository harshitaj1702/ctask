import React, { useState } from "react";
import {
  Button,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { postData } from "../../services/ServerServices";

function AddRoom() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offerprice, setOfferprice] = useState("");
  const [pictures, setPictures] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("offerprice", offerprice);
    pictures.forEach((item) => {
      formData.append("pictures", item);
    });
    const response = await postData("rooms", formData);
    if (response.status) {
      navigate('/dashboard/room')
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "50%", marginTop: "10px" }}>
        <form onSubmit={handleSubmit}>
          <Paper variant="outlined" square style={{ padding: "20px" }}>
            <h3>Add Room</h3>
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
                <input
                  id="outlined"
                  label="Pictures"
                  type="file"
                  onChange={(e) => setPictures(Object.values(e.target.files))}
                  fullWidth
                  multiple
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit">Submit</Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </div>
    </div>
  );
}

export default AddRoom;
