import { useState } from 'react';
import ChangeCameraEditIcon from './icons/ChangeCameraEditIcon';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function EditProfileInfo(props) {
    const currentUser = props.currentUser;
    let initialURL = currentUser.userImg;
    const [previewImageUrl, setPreviewImageUrl] = useState(initialURL)

    const handleImageChange = async (event) => {
        if(event.target.files.length > 0 && event.target.files[0]) {
            const imageFile = event.target.files[0];
            setPreviewImageUrl(URL.createObjectURL(imageFile));
          
        //  Uploading User Image
            const storage = getStorage();
            const imageRef = storageRef(storage, "userImages/" + currentUser.uid + "-profile-image");
            
            await uploadBytes(imageRef, imageFile);
            const donwloadUrlString = await getDownloadURL(imageRef);
            console.log(donwloadUrlString);
            await updateProfile(currentUser, { photoURL: donwloadUrlString});
            toast.success('Update Successful!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                theme: "colored",
                });
        }
    }

    return (
        <div>
            <div className="container">
                <div className="d-flex justify-content-center">
                    <h1 className="edit-profile-header">Edit Profile</h1>
                </div>
            </div>
            <div className="container">
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <img className="profile-picture my-3" src={previewImageUrl || currentUser.userImg} alt="profile"></img>
                    <input type="file" name="image" id="imageUploadInput" onChange={handleImageChange} className="d-none" accept='image/*'/>
                    <label htmlFor="imageUploadInput" className="upload-label change-text-edit">Change Profile Image</label>
                    <label htmlFor="imageUploadInput" className="upload-label"><ChangeCameraEditIcon /></label>
                </div>
            </div>
            <ToastContainer />
        </div>
  );
}

export default EditProfileInfo