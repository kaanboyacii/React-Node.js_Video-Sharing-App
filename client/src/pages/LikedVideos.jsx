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
      if (currentUser && currentUser._id) {
        // Check that currentUser and currentUser._id exist
        try {
          // Fetch all videos
          const response = await axios.get("/videos");
          const allVideos = response.data;
          // Filter videos based on user likes
          const likedVideos = allVideos.filter((video) =>
            video.likes.includes(currentUser._id)
          );
          // Set filtered videos in state
          setVideos(likedVideos);
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

export default Library;
