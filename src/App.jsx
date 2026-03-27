import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Calendar from './components/Calendar';
import EventDetail from './components/EventDetail';
import AddEvent from './components/AddEvent';
import { useState } from 'react';
import initialEvents from './data/events';

function App() {
  const [events, setEvents] = useState(initialEvents);

  const addEvent = (newEvent) => {
    setEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Calendar events={events} />} />
        <Route path="/event/:id" element={<EventDetail events={events} />} />
        <Route path="/add" element={<AddEvent addEvent={addEvent} />} />
      </Routes>
    </Router>
  );
}

export default App;