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
        const res = await axios.get(`/playlists/${playlistId}`);
        setVideos(res.data.videos);
      } catch (err) {
        console.error(err);
      }
    };
    if (playlistId) {
      fetchVideos(playlistId);
    } else {
      console.error("playlistId is undefined or null");
    }
  }, [playlistId]);

  return (
    <div>
      <h2>My Playlist</h2>
      <h3>Videos</h3>
      <ul>
        {videos.map((video) => (
          <li key={video._id}>{video.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
