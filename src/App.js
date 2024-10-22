import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { VisitionCardUp } from './component/VisitionCardUp';
import CardList from './component/CardList';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VisitionCardUp />} />
        <Route path="/cards" element={<CardList />} />
      </Routes>
    </Router>

  );
}

export default App;
