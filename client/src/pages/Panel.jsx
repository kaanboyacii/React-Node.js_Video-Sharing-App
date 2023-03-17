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
  const [subscribedUser, setSubscribedUsers] = useState("profile");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
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
      <Avatar src={currentUser.img} alt={`${currentUser.name}'s avatar`} />
      <h2 style={{ fontSize: "40px" }}>{currentUser.name}</h2>
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
          <h3>About Me</h3>
          <p>{currentUser.about}</p>
          <ul>
            {currentUser.library.map((library, index) => (
              <li key={index}>{library}</li>
            ))}
          </ul>
        </div>
      )}
      {activeTab === "following" && (
        <div>
          <ul style={{ fontSize: "20px" }}>
            {subscribedUser.map((user) => (
              <li
                style={{ cursor: "pointer", marginBottom: "10px" }}
                key={user.id}
                onClick={() =>
                  navigate(`/users/find/${user._id}`, {
                    state: { userId: user._id },
                  })
                }
              >
                {user.name} ({user.subscribers} subscribers)
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default Panel;
