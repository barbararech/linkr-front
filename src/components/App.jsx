import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignUpPage from "./SignUpPage.jsx";
import SignInPage from "./SignInPage.jsx";
import TimelinePage from "./TimelinePage.jsx";
import HashtagPage from "./HashtagPage.jsx";
import { UserDataProvider } from "../contexts/userContext.jsx";
import refreshAxiosContext from "../contexts/refreshAxiosContext.jsx";
import UserPage from "./UserPage.jsx";

function App() {
  const [refreshAxios, setRefreshAxios] = useState(false);

  return (
    <BrowserRouter>
      <UserDataProvider>
        <refreshAxiosContext.Provider value={{ refreshAxios, setRefreshAxios }}>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
            <Route path="/user/:id" element={<UserPage />} />
          </Routes>
        </refreshAxiosContext.Provider>
      </UserDataProvider>
    </BrowserRouter>
  );
}

export default App;
