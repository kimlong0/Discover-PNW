import EditProfileInfo from '../EditProfileInfo';
import EditProfileForm from '../EditProfileForm';

function EditProfilePage(props) {
  return (
    <div>
      <EditProfileInfo currentUser={props.currentUser}/>
      <EditProfileForm currentUser={props.currentUser}/>
    </div>
  )
}

export default EditProfilePage