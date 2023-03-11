import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { subscription } from "../redux/userSlice";

const Container = styled.div`
  display: flex;
  gap: 11px;
  /* justify-content: space-between; */
  flex-wrap: wrap;
`;

const ChannelInfo = styled.div`
  background-color: #2f3440;
  border-radius: 10px;
  color: #ffffff;
  padding: 20px;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
`;

const ChannelImage = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: #999;
`;

const Title = styled.h1`
  padding: 10px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  flex: 1;
  margin: 0;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  margin-left: auto;
`;

function Channel() {
  const [videos, setVideos] = useState([]);
  const location = useLocation();
  const userId = location.state?.userId;
  const [user, setUser] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSub = async () => {
    currentUser.subscribedUsers.includes(user._id)
      ? await axios.put(`/users/unsub/${user._id}`)
      : await axios.put(`/users/sub/${user._id}`);
    dispatch(subscription(user._id));
  };

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`/users/find/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchChannel();
  }, [user]);

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
      <ChannelInfo>
        <ChannelImage src={user.img}></ChannelImage>
        <Title>{user.name}</Title>
        <Subscribe onClick={handleSub} disabled={!currentUser}>
          {currentUser?.subscribedUsers?.includes(user._id)
            ? "SUBSCRIBED"
            : "SUBSCRIBE"}
        </Subscribe>
      </ChannelInfo>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
}

export default Channel;
