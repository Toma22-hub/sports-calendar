import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Calendar.css';

function Calendar({ events }) {
  const navigate = useNavigate();
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [filterSport, setFilterSport] = useState('All');
  const [filterFrom, setFilterFrom] = useState('');
  const [filterTo, setFilterTo] = useState('');
  const [filterTeam, setFilterTeam] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = ["January","February","March","April","May","June",
    "July","August","September","October","November","December"];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const sports = ['All', 'Football', 'Ice Hockey', 'Basketball', 'Tennis', 'Other'];

  const filteredEvents = events.filter(e => {
    const matchSport = filterSport === 'All' || e.sport === filterSport;
    const matchFrom = !filterFrom || e.dateVenue >= filterFrom;
    const matchTo = !filterTo || e.dateVenue <= filterTo;
    const matchTeam = !filterTeam ||
      e.homeTeam?.name.toLowerCase().includes(filterTeam.toLowerCase()) ||
      e.awayTeam?.name.toLowerCase().includes(filterTeam.toLowerCase());
    return matchSport && matchFrom && matchTo && matchTeam;
  });

  const getEventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredEvents.filter(e => e.dateVenue === dateStr);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isTodayCell = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div className="calendar-wrapper">
      <div className="calendar-container">
        <div className="calendar-nav">
          <button onClick={goToPrevMonth} className="calendar-nav-btn">←</button>
          <h2 className="calendar-title">{monthNames[month]} {year}</h2>
          <button onClick={goToNextMonth} className="calendar-nav-btn">→</button>
        </div>

        <div className="calendar-grid">
          {dayNames.map(d => <div key={d} className="calendar-day-name">{d}</div>)}
          {cells.map((day, i) => {
            const dayEvents = day ? getEventsForDay(day) : [];
            return (
              <div key={i} className={`calendar-cell ${isTodayCell(day) ? 'today' : ''} ${!day ? 'empty' : ''}`}
                style={{ backgroundColor: isTodayCell(day) ? '#6f79d2' : '#f8f8f8' }}>
                {day && <span className="calendar-day-num">{day}</span>}
                {dayEvents.map(ev => (
                  <div key={ev.id} className="event-badge"
                    onClick={() => navigate(`/event/${ev.id}`)}>
                    {ev.homeTeam ? ev.homeTeam.name : '?'} vs {ev.awayTeam ? ev.awayTeam.name : '?'}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="sidebar">
        <h3 className="sidebar-title">🔍 Filters</h3>

        <div className="filter-group">
          <label className="filter-label">Search Team</label>
          <input
            type="text"
            placeholder="e.g. Al Hilal"
            value={filterTeam}
            onChange={e => setFilterTeam(e.target.value)}
            className="filter-select"
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Sport</label>
          <select value={filterSport}
            onChange={e => setFilterSport(e.target.value)}
            className="filter-select">
            {sports.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">From Date</label>
          <input type="date" value={filterFrom}
            onChange={e => setFilterFrom(e.target.value)}
            className="filter-select" />
        </div>

        <div className="filter-group">
          <label className="filter-label">To Date</label>
          <input type="date" value={filterTo}
            onChange={e => setFilterTo(e.target.value)}
            className="filter-select" />
        </div>

        <button onClick={() => {
          setFilterSport('All');
          setFilterFrom('');
          setFilterTo('');
          setFilterTeam('');
        }} className="clear-btn">
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default Calendar;
