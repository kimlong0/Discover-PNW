import { Link } from 'react-router-dom';
import EditIcon from './icons/EditIcon';
import { getAuth, signOut } from 'firebase/auth';

function ProfileInfo(props) {
  const currentUser = props.currentUser;

  function handleSignOut() {
    signOut(getAuth());
    props.resetLocalState()
  }

  return (
    <div className="profile d-flex justify-content-center align-items-center pt-5 container">
      <img className="profile-picture me-3" src={currentUser.userImg} alt="profile"></img>
      <h1 className="profile-name">{currentUser.displayName}</h1>
      <div className='utilities-wrapper'>
        <Link to='/edit-profile'>
            <button className="edit-profile-button">
              <EditIcon />
            </button>
        </Link>
      </div>
      <button className='sign-out-button' onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default ProfileInfo