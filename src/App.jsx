import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlaceSlider from "./components/PlaceSlider";
import PlaceDetails from "./components/PlaceDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlaceSlider />} />
        <Route path="/place/:placeId" element={<PlaceDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
