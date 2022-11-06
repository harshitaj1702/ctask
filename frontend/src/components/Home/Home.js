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
  const userData = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
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
      <CardActions disableSpacing>
        <Button
          onClick={() =>
            userData ? navigate("/" + item.id) : navigate("/login")
          }
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
}

export default function Home() {
  const [data, setData] = React.useState([]);

  const fetchAllRooms = async () => {
    const response = await getData("rooms/display");
    if (response.status) {
      setData(response.data);
    }
  };

  React.useEffect(() => {
    fetchAllRooms();
  }, []);

  return (
    <>
      <Header />
      <h2>Book your room now!!</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data.map((item) => (
          <Item item={item} />
        ))}
      </div>
    </>
  );
}
