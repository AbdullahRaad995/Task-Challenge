import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MainItemPage from './items/MainItemPage.jsx'
import ViewItemsPage from './items/ViewItemsPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MainItemPage />} />
        <Route path="/:id" element={<ViewItemsPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  </StrictMode>,
)
