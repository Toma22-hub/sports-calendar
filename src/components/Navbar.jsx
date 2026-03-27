import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <span style={styles.logo}>⚽ Sports Calendar</span>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Calendar</Link>
        <Link to="/add" style={styles.link}>+ Add Event</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#1a1a2e', padding: '14px 24px', color: 'white'
  },
  logo: { fontSize: '1.2rem', fontWeight: 'bold', color: '#e94560' },
  links: { display: 'flex', gap: '20px' },
  link: { color: 'white', textDecoration: 'none', fontSize: '1rem' }
};

export default Navbar;
