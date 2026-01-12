
import './App.css'
import { CmsProvider } from './utils/context'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import About from './pages/about/About';
import Agency from './pages/agency/Agency';
import Work from './pages/work/Work';
import Website from './pages/website/Website';


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
          <Route
            path="/work"
            element={<Work />}
          ></Route>
          <Route
            path="/website"
            element={<Website />}
          ></Route>
        </Routes>
      </Router>
    </CmsProvider>
  )
}



export default App
