import { Link } from 'react-router-dom';

function Footer() {
    return (
      <footer className="app-footer pt-5 px-5 pb-2">
        <div className='footer-wrapper container'>
          <div className='about-wrapper'>
            <h1>About</h1>
            <p>Discover PNW offers a way for users to reflect on their travels of unique and memorable activities in a measurable way by creating a reflective, welcoming, and inclusive platform.</p>
          </div>
          <div className='links-wrapper'>
            <div className='footer-links-wrapper'>
              <h2 className='footer-links-header'>Site</h2>
              <Link className='footer-link' to='/'>Home</Link>
              <Link className='footer-link' to='activities'>Adventures</Link>
              <Link className='footer-link' to='profile'>Profile</Link>
            </div>
            <div className='footer-links-wrapper'>
              <h2 className='footer-links-header'>Misc</h2>
              <a className='footer-link' href='mailto:kimlong0@uw.edu'>Contact</a>
              <a className='footer-link' href='https://en.wikipedia.org/wiki/Pacific_Northwest' target="_blank" rel="noreferrer">Pacific Northwest</a>
              <a className='footer-link' href='https://localadventurer.com/things-to-do-in-the-pacific-northwest/' target="_blank" rel="noreferrer">Recommendations</a>
            </div>
          </div>
        </div>
        <div className='footer-logo-wrapper'>
          <img className='app-logo footer-logo' src="/img/discover_pnw_logo.png" alt='discover logo'></img>
        </div>
        <a className='footer-link' href='#navbar'>
          <p className='text-center m-1 text-success'>Back to Top</p>
        </a>
        <p className="small copyright-info">&copy; Discover PNW</p>
      </footer>
    )
}

export default Footer