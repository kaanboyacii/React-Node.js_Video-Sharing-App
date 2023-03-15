import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

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
  border-bottom: ${(props) => (props.active ? "2px solid blue" : "none")};
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

const Panel = ({ user }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <Avatar src={currentUser.avatar} alt={`${currentUser.name}'s avatar`} />
      <h2>{currentUser.name}</h2>
      <Tabs>
        <Tab
          active={activeTab === "profile"}
          onClick={() => handleTabClick("profile")}
        >
          Profile
        </Tab>
        <Tab
          active={activeTab === "friends"}
          onClick={() => handleTabClick("friends")}
        >
          Friends
        </Tab>
        <Tab
          active={activeTab === "photos"}
          onClick={() => handleTabClick("photos")}
        >
          Photos
        </Tab>
      </Tabs>
      {activeTab === "profile" && (
        <div>
          <h3>About Me</h3>
          <p>{currentUser.about}</p>
          <h3>Interests</h3>
          <ul>
            {currentUser.library.map((library, index) => (
              <li key={index}>{library}</li>
            ))}
          </ul>
        </div>
      )}
      {activeTab === "friends" && (
        <div>
          <h3>Friends</h3>
          {currentUser.friends.map((friend) => (
            <div key={friend.id}>
              <Avatar src={friend.avatar} alt={`${friend.name}'s avatar`} />
              <p>{friend.name}</p>
            </div>
          ))}
        </div>
      )}
      {activeTab === "photos" && (
        <div>
          <h3>Photos</h3>
          <Gallery>
            {currentUser.photos.map((photo, index) => (
              <Photo key={index} src={photo} alt={`${user.name}'s photo`} />
            ))}
          </Gallery>
        </div>
      )}
    </Container>
  );
};

export default Panel;
