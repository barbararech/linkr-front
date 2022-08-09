import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./SignUpPage.jsx";
import SignInPage from "./SignInPage.jsx";
import { UserDataProvider } from "../contexts/userContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <UserDataProvider>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </UserDataProvider>
    </BrowserRouter>
  );
}

export default App;
