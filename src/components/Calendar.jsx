import { useNavigate } from 'react-router-dom';

function Calendar({ events }) {
  const navigate = useNavigate();
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const monthNames = ["January","February","March","April","May","June",
    "July","August","September","October","November","December"];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getEventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.dateVenue === dateStr);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{monthNames[month]} {year}</h2>
      <div style={styles.grid}>
        {dayNames.map(d => <div key={d} style={styles.dayName}>{d}</div>)}
        {cells.map((day, i) => {
          const dayEvents = day ? getEventsForDay(day) : [];
          const isToday = day === today.getDate();
          return (
            <div key={i} style={{
              ...styles.cell,
              backgroundColor: isToday ? '#519fd3' : '#f1f2f4',
              opacity: day ? 1 : 0.2
            }}>
              {day && <span style={styles.dayNum}>{day}</span>}
              {dayEvents.map(ev => (
                <div key={ev.id} style={styles.eventBadge}
                  onClick={() => navigate(`/event/${ev.id}`)}>
                  {ev.homeTeam ? ev.homeTeam.name : '?'} vs {ev.awayTeam ? ev.awayTeam.name : '?'}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', backgroundColor: '#3d4a58', minHeight: '100vh' },
  title: { textAlign: 'center', color: 'white', marginBottom: '16px' },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '6px', maxWidth: '900px', margin: '0 auto'
  },
  dayName: { color: '#fff9fa', textAlign: 'center', fontWeight: 'bold', padding: '8px' },
  cell: {
    minHeight: '80px', borderRadius: '8px', padding: '6px',
    color: 'white', fontSize: '0.8rem'
  },
  dayNum: { color:'#0c0c0c', display: 'block', fontWeight: 'bold', marginBottom: '4px' },
  eventBadge: {
    backgroundColor: '#e94560', borderRadius: '4px', padding: '2px 4px',
    marginTop: '2px', cursor: 'pointer', fontSize: '0.7rem', lineHeight: '1.3'
  }
};

export default Calendar;