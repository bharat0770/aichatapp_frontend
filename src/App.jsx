import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginScreen from "./components/LoginScreen"
import RegisterScreen from "./components/RegisterScreen"
import HomeScreen from "./components/HomeScreen"
import { Toaster } from "react-hot-toast"

function App() {
 
  return (
    
      <BrowserRouter>
        <Toaster />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
