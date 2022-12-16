import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className='error-page container d-flex flex-column align-items-center justify-content-between'>
        <h1>Oops!</h1>
        <h1 className='text-center pb-3'>You stumbled on a nonexistent page!</h1>
        <img className='sad-face' src='/img/sad-icon.svg' alt='sad-face'></img>
        <Link to='discover'><h2>Go Home</h2></Link>
    </div>
  )
}

export default ErrorPage