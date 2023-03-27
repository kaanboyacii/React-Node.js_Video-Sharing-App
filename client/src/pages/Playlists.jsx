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

const Playlists = () => {
  const [videos, setVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchVideos = async () => {
      if (currentUser && currentUser._id) {
        // check that currentUser and currentUser._id exist
        try {
          const res = await axios.get(`/users/library/${currentUser._id}`);
          setVideos(res.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchVideos();
  }, [currentUser]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Playlists;
