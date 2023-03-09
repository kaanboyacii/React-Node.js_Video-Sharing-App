import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "310px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "40px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  border-radius: 10px;
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});
  const [views, setViews] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  const handleView = async () => {
    try {
      const response = await axios.put(`/videos/view/${video._id}`);
      setViews(response.data.views);
      console.log("izlenme arttırıldı");
    } catch (err) {
      console.error(err);
    }
  };

  const formatView = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };

  return (
    <Container type={type}>
        <Link
          onClick={handleView}
          to={`/video/${video._id}`}
          style={{ textDecoration: "none" }}
        >
        <Image type={type} src={video.imgUrl} />
          </Link>
        <Details type={type}>
          <ChannelImage
            onClick={() => navigate(`/users/find/${channel._id}`, { state: { userId: channel._id } })}
            type={type}
            src={channel.img}
          />
          <Texts>
            <Title  onClick={() => navigate(`/video/${video._id}`)}>{video.title}</Title>
            <ChannelName  onClick={() => navigate(`/users/find/${channel._id}`)}>{channel.name}</ChannelName>
            <Info>
              {formatView(video.views)} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
  );
};

export default Card;
