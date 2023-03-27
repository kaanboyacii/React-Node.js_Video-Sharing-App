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
    const { currentUser } = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);
  const [playlists, setPlaylists] = useState([]);


  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await axios.get("/playlists");
        const filteredPlaylists = res.data.filter(
          (playlist) => playlist.userId === currentUser._id
        );
        setPlaylists(filteredPlaylists);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPlaylists();
  }, [currentUser._id]);

  return (
    <Container>
      {playlists.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Playlists;
