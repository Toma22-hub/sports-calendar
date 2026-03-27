import { useParams, useNavigate } from 'react-router-dom';

function EventDetail({ events }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === parseInt(id) || e.id === id);

  if (!event) return <div style={styles.container}><p style={{color:'white'}}>Event not found.</p></div>;

  const home = event.homeTeam;
  const away = event.awayTeam;
  const result = event.result;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.back}>← Back</button>
      <div style={styles.card}>
        <h2 style={styles.title}>{event.originCompetitionName}</h2>
        <p style={styles.sub}>{event.stage?.name} · Season {event.season}</p>
        <p style={styles.sub}>📅 {event.dateVenue} &nbsp; 🕐 {event.timeVenueUTC}</p>
        <div style={styles.matchup}>
          <span style={styles.team}>{home ? home.name : 'TBD'}</span>
          <span style={styles.vs}>vs</span>
          <span style={styles.team}>{away ? away.name : 'TBD'}</span>
        </div>
        {result && (
          <div style={styles.score}>
            {result.winner
              ? <><p style={styles.scoreLine}>{result.homeGoals} – {result.awayGoals}</p>
                  <p style={styles.winner}>🏆 Winner: {result.winner}</p></>
              : <p style={styles.status}>Status: {event.status}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0f3460', minHeight: '100vh', padding: '30px' },
  back: { backgroundColor: '#e94560', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', marginBottom: '20px' },
  card: { backgroundColor: '#16213e', borderRadius: '12px', padding: '30px', maxWidth: '500px', margin: '0 auto', color: 'white' },
  title: { color: '#e94560', marginBottom: '6px' },
  sub: { color: '#aaa', marginBottom: '6px' },
  matchup: { display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '24px 0' },
  team: { fontSize: '1.2rem', fontWeight: 'bold' },
  vs: { color: '#e94560', fontSize: '1.5rem', fontWeight: 'bold' },
  score: { textAlign: 'center' },
  scoreLine: { fontSize: '2rem', fontWeight: 'bold', color: '#e94560' },
  winner: { color: '#4ade80', fontSize: '1.1rem' },
  status: { color: '#aaa', textTransform: 'capitalize' }
};

export default EventDetail;