import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEvent({ addEvent }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    dateVenue: '', timeVenueUTC: '', homeTeamName: '',
    awayTeamName: '', competition: '', stage: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent({
      dateVenue: form.dateVenue,
      timeVenueUTC: form.timeVenueUTC,
      homeTeam: { name: form.homeTeamName },
      awayTeam: { name: form.awayTeamName },
      originCompetitionName: form.competition,
      stage: { name: form.stage },
      status: 'scheduled',
      result: null,
      season: new Date().getFullYear()
    });
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add New Event</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {[
          ['dateVenue', 'Date (YYYY-MM-DD)', 'date'],
          ['timeVenueUTC', 'Time (HH:MM:SS)', 'time'],
          ['homeTeamName', 'Home Team Name', 'text'],
          ['awayTeamName', 'Away Team Name', 'text'],
          ['competition', 'Competition Name', 'text'],
          ['stage', 'Stage (e.g. FINAL)', 'text'],
        ].map(([name, label, type]) => (
          <div key={name} style={styles.field}>
            <label style={styles.label}>{label}</label>
            <input name={name} type={type} value={form[name]}
              onChange={handleChange} required style={styles.input} />
          </div>
        ))}
        <button type="submit" style={styles.btn}>Add Event</button>
      </form>
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#0f3460', minHeight: '100vh', padding: '30px' },
  title: { color: 'white', textAlign: 'center', marginBottom: '24px' },
  form: { maxWidth: '450px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { color: '#aaa', fontSize: '0.9rem' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #444', backgroundColor: '#16213e', color: 'white', fontSize: '1rem' },
  btn: { backgroundColor: '#e94560', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }
};

export default AddEvent;