import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 340px;
  height: 300px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
  margin-left: 10px;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const ButtonG = styled.button`
  background-color: #32cd32;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #228b22;
  }
`;

const Label = styled.label`
  font-size: 14px;
`;

const Report = ({ setPlaylistOpen }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [inputs, setInputs] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

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

  const handleAddToPlaylist = async (playlistId) => {
    try {
      const res = await axios.post(
        `/playlists/addVideo/${playlistId}/${currentVideo._id}`
      );
      console.log(res.data);
      setPlaylistOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreatePlaylist = () => {
    setIsFormVisible(true);
  };

  const handleSubmit = () => {
    setIsFormVisible(true);
  };
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setPlaylistOpen(false)}>X</Close>
        <Title>Add video to playlist</Title>
        <Label>Select playlist:</Label>
        <select name="playlist" onChange={handleChange}>
          {playlists.map((playlist) => (
            <option key={playlist._id} value={playlist._id}>
              {playlist.title}
            </option>
          ))}
        </select>
        <Button onClick={handleAddToPlaylist}>Add to playlist</Button>
        <ButtonG onClick={handleCreatePlaylist}>Create new playlist</ButtonG>
        {isFormVisible && (
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <Input
                type="text"
                name="title"
                onChange={handleChange}
                required
              />
            </label>
            <ButtonG style={{marginLeft:"10px"}} type="submit">Create</ButtonG>
          </form>
        )}
      </Wrapper>
    </Container>
  );
};

export default Report;
