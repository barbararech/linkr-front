import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from './components/SignUpPage.jsx'

function App() {

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUpPage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
