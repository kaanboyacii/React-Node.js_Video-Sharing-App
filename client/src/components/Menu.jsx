import React, { useEffect, useState } from "react";
import styled from "styled-components";
import UyuTube from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
const Container = styled.div`
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  bottom: 0;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.bgLighter};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.primaryColor};
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.primaryColorLight};
  }

  /* Scrollbar'ı gizlemek için */
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const ChannelImg = styled.img`
  border-radius: 50%;
  height: 25px;
  width: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    border-radius: 10px;
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [subscribedUsers, setSubscribedUsers] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      console.error("Current user is null.");
      return;
    }
  
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
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      console.error("Current user is null.");
      return;
    }
    const fetchSubscribedUsers = async () => {
      try {
        const subscribedUserIds = currentUser.subscribedUsers;
        const usersRes = await Promise.all(
          subscribedUserIds.map((userId) => axios.get(`/users/find/${userId}`))
        );
        const subscribedUsers = usersRes.map((res) => res.data);
        setSubscribedUsers(subscribedUsers);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubscribedUsers();
  }, [currentUser]);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={UyuTube} />
            UyuTube
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>
        {currentUser && (
          <>
            <Hr />
            <Title>Subscribed channels</Title>
            {subscribedUsers.map((user) => (
              <Item
                style={{ cursor: "pointer", marginBottom: "10px" }}
                key={user._id}
                onClick={() =>
                  navigate(`/users/find/${user._id}`, {
                    state: { userId: user._id },
                  })
                }
              >
                <ChannelImg src={user.img} />
                {user.name}
              </Item>
            ))}
          </>
        )}
        {currentUser && (
          <>
            <Hr />
            <Title>Playlists</Title>
            {playlists.map((playlist) => (
              <Item
                style={{ cursor: "pointer", marginBottom: "10px" }}
                key={playlist._id}
                onClick={() =>
                  navigate(`/playlist/${playlist._id}`, {
                    state: { playlistId: playlist._id },
                  })
                }
              >
                <PlaylistPlayIcon />
                {playlist.title}
              </Item>
            ))}
          </>
        )}
        <Hr />
        {currentUser && (
          <>
            <Item onClick={() => navigate(`/users/library/${currentUser._id}`)}>
              <VideoLibraryOutlinedIcon />
              Library
            </Item>
            <Item
              onClick={() => navigate(`/users/likedvideos/${currentUser._id}`)}
            >
              <ThumbUpOffAltIcon />
              Liked Videos
            </Item>
            <Hr />
          </>
        )}
        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        <Title>BEST OF UyuTube</Title>
        <Item onClick={() => navigate(`/search?q=music`)}>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item onClick={() => navigate(`/search?q=sport`)}>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item onClick={() => navigate(`/search?q=gaming`)}>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item onClick={() => navigate(`/search?q=movies`)}>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Item onClick={() => navigate(`/search?q=news`)}>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        {/* <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item> */}
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
