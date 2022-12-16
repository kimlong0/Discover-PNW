import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function EditProfileForm(props) {
    const currentUser = props.currentUser;
    const [firstName, setFirstName] = useState(currentUser.firstName);
    const [lastName, setLastName] = useState(currentUser.lastName);
    
    const navigateTo = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        const newDisplayName = firstName + " " + lastName;
        await updateProfile(currentUser, { displayName: newDisplayName });

        // window.location.reload();
        navigateTo('/profile');
    }

    return (
        <div className='container'>
            <Form className="edit-profile-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder={currentUser.firstName} 
                        className='profile-text-input' 
                        value={firstName} 
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder={currentUser.lastName} 
                        className='profile-text-input'
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <button type='submit' className='btn edit-profile-submit'>Submit</button>
                </div>
            </Form>
        </div>
    );
}

export default EditProfileForm