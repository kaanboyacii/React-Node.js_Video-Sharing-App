import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  padding: 20px;
  color: white;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  margin: 0 10px;
  padding: 10px;
  cursor: pointer;
  border-bottom: ${(props) => (props.active ? "2px solid red" : "none")};
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

const Photo = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
`;

const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
  width: 100%;
  height: 40px;
  font-size: 16px;
  margin: 10px 0;
  box-shadow: 0 0 5px ${({ theme }) => theme.soft};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Button = styled.button`
  margin-top: 20px;
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  width: 40%;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;

const Panel = ({ user }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("profile");
  const [subscribedUsers, setSubscribedUsers] = useState([]);
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(`/users/${currentUser._id}`, { ...inputs });
    res.status === 200 && navigate(`/users/panel/${res.data._id}`);
    window.location.reload();
  };

  return (
    <Container>
      <Avatar src={currentUser.img} alt={`${currentUser.name}'s avatar`} />
      <Title style={{ fontSize: "40px" }}>{currentUser.name}</Title>
      <Tabs>
        <Tab
          active={activeTab === "profile"}
          onClick={() => handleTabClick("profile")}
        >
          Profile
        </Tab>
        <Tab
          active={activeTab === "following"}
          onClick={() => handleTabClick("following")}
        >
          Following
        </Tab>
      </Tabs>
      {activeTab === "profile" && (
        <div>
          <Title>Update Profile</Title>
          <Label>Name:</Label>
          <Input
            type="text"
            name="name"
            placeholder={currentUser.name}
            onChange={handleChange}
          />
          <Label>E-mail:</Label>
          <Input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder={currentUser.email}
          />
          <Label>Password:</Label>
          <Input
            name="password"
            type="text"
            onChange={handleChange}
            placeholder={currentUser.tags}
          />
          <ButtonContainer>
            <Button onClick={handleUpdate}>Update</Button>
          </ButtonContainer>
        </div>
      )}
      {activeTab === "following" && <div></div>}
    </Container>
  );
};

export default Panel;
