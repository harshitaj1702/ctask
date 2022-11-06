/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import { getData, postData, serverURL } from "../../services/ServerServices";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
import "./Booking.css";
import Header from "./Header";

export default function Booking() {
  const navigate = useNavigate();
  const params = useParams();
  const [startDate, setStartDate] = useState();
  const [excludes, setExcludes] = useState([]);
  const [data, setData] = useState({});

  const fetchAllRooms = async () => {
    const response = await getData("rooms/display/" + params.id);
    if (response.status) {
      setData(response.data);
      let dates = response.data.dates.split(",");
      dates = dates.map((item) => new Date(item));
      setExcludes(dates);
    }
  };

  React.useEffect(() => {
    fetchAllRooms();
  }, [params.id]);

  const handleBook = async () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      const body = {
        roomid: params.id,
        userid: userData.id,
        date: startDate,
      };
      const result = await postData("rooms/book", body);
      if (result.status) {
        alert("Room booked successfully");
        navigate("/");
      }
    } else {
        navigate("/login")
    }
  };

  return (
    <>
      <Header />
      <h3>{data.title}</h3>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {data.pictures &&
          data.pictures
            .split(",")
            .map((item, index) => (
              <img
                src={`${serverURL}/images/${item}`}
                width="400px"
                height="200px"
                alt={data.title}
                loading="lazy"
              />
            ))}
      </div>
      <h3>Offerprice: ₹{data.offerprice}</h3>
      <p>
        <s>Price: ₹{data.price}</s>
      </p>
      <h4>Booking Date- </h4>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        excludeDates={excludes}
        minDate={new Date()}
        placeholderText="Select Booking date"
      />

      <Button
        variant="contained"
        style={{ marginTop: 20 }}
        onClick={handleBook}
      >
        Book Now
      </Button>
    </>
  );
}
