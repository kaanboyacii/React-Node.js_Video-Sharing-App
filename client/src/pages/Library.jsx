import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  gap: 10px;
  /* justify-content: space-between; */
  flex-wrap: wrap;
`;

const Library = () => {
  const [videos, setVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.user);


  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/users/library/${currentUser._id}`);
      setVideos(res.data);
    }
    fetchVideos();
  }, [currentUser]);
  console.log(videos)


  
  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  );
};

export default Library;
