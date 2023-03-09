import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  gap: 10px;
  /* justify-content: space-between; */
  flex-wrap: wrap;
`;

function Channel() {
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/videos/findByUser/${userId}`);
        setVideos(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVideos();
  }, [userId]);
  

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  );
};

export default Channel;
