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
        const playlistVideos = res.data.videos || [];
        const videoIds = playlistVideos.map((video) => video._id).filter((id) => id);
        console.log(videoIds);
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
    <div>
      <h2>My Playlist</h2>
      <h3>Videos</h3>
      <ul>
        {videos.map((video) => {
          console.log(video);
          return <li key={video._id}>{video.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Playlist;
