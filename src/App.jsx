
import './App.css'
import { CmsProvider } from './utils/context'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import About from './pages/about/About';
import Agency from './pages/agency/Agency';


function App() {
  return (
    <CmsProvider>
      <Router>
        <Routes>
          {/* Define your routes here */}
          <Route
            path="/"
            element={<Homepage />}
          ></Route>
          <Route
            path="/about"
            element={<About />}
          ></Route>
          <Route
            path="/agency"
            element={<Agency />}
          ></Route>
        </Routes>
      </Router>
    </CmsProvider>
  )
}



export default App
