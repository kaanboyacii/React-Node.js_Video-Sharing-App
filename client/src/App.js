import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import Category from "./pages/Category";
import Channel from "./pages/Channel";
import Library from "./pages/Library";
import LikedVideos from "./pages/LikedVideos";
import Panel from "./pages/Panel";
import Playlists from "./pages/Playlists";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    document.title = "UyuTube";
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="users/library">
                    <Route path=":id" element={<Library />} />
                  </Route>
                  <Route path="users/playlists">
                    <Route path=":id" element={<Playlists />} />
                  </Route>
                  <Route path="users/likedvideos">
                    <Route path=":id" element={<LikedVideos />} />
                  </Route>
                  <Route path="specificTags" element={<Category type="specificTags" />} />
                  <Route path="search" element={<Search/>} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                  <Route path="users/find">
                    <Route path=":id" element={<Channel />} />
                  </Route>
                  <Route path="users/panel">
                    <Route path=":id" element={<Panel />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
