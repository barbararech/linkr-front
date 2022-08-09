import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./SignUpPage.jsx";
import SignInPage from "./SignInPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
