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

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const SubTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
`;

const Playlist = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const playlistId = location.state?.playlistId;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (!playlistId) {
          console.error("playlistId is undefined or null");
          return;
        }
        const res = await axios.get(`/playlists/${playlistId}`);
        const playlistVideos = res.data.videos;
        const videoIds = playlistVideos.filter((id) => id);
        const promises = videoIds.map((videoId) =>
          axios.get(`/videos/find/${videoId}`)
        );
        const videoData = await Promise.all(promises);
        const videos = videoData.map((res) => res.data);
        setVideos(videos);
      } catch (err) {
        console.error(err);
      }
    };
    fetchVideos();
  }, [playlistId]);

  return (
    <>
      <TitleContainer>
        <Title>My Playlist</Title>
        <SubTitle>Videos</SubTitle>
      </TitleContainer>
      <Container>
        {videos.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </Container>
    </>
  );
};

export default Playlist;
