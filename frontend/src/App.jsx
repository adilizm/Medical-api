import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Availability from "./pages/Availability";
import Booking from "./pages/Booking";

function App() {
  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/availability/:id" element={<Availability />} />
      <Route path="/booking" element={<Booking />} />
    </Routes>
  )
}

export default App
