import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { getData, serverURL } from "../../services/ServerServices";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Item({ item }) {
  return (
    <Card sx={{ width: 345, margin: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {item.title.slice(0, 1)}
          </Avatar>
        }
        title={item.title}
        subheader="New Delhi, India"
      />
      <CardMedia
        component="img"
        height="194"
        image={`${serverURL}/images/${item.pictures.split(",")[0]}`}
        alt=""
      />
      <CardContent>
        <Typography paragraph>{item.description}</Typography>

        <h3 style={{ display: "flex", justifyContent: "flex-start" }}>
          ₹{item.offerprice}
        </h3>
        <p style={{ display: "flex", justifyContent: "flex-start" }}>
          <s>₹{item.price}</s>
        </p>
      </CardContent>
      <CardActions
        disableSpacing
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Button variant="contained">
          Booking Date: {new Date(item.date).toString().slice(0, 16)}
        </Button>
        <Button
          variant="contained"
          style={{ marginTop: 5 }}
          color={item.status == "Booked" ? "primary" : "secondary"}
        >
          Status: {item.status}
        </Button>
      </CardActions>
    </Card>
  );
}

export default function MyBooking() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = React.useState([]);

  const fetchAllBooking = async () => {
    const response = await getData("rooms/mybooking/" + userData.id);
    if (response.status) {
      setData(response.data);
    }
  };

  React.useEffect(() => {
    fetchAllBooking();
  }, []);

  return (
    <>
      <Header />
      <h4>My Bookings</h4>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.map((item) => (
          <Item item={item} />
        ))}
      </div>
    </>
  );
}
