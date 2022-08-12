import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./SignUpPage.jsx";
import SignInPage from "./SignInPage.jsx";
import TimelinePage from "./TimelinePage.jsx";
import HashtagPage from "./HashtagPage.jsx";
import { UserDataProvider } from "../contexts/userContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <UserDataProvider>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
        </Routes>
      </UserDataProvider>
    </BrowserRouter>
  );
}

export default App;
