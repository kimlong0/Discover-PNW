import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { Navigate } from 'react-router-dom';

function LogInPage(props){
    const auth = getAuth();
    const userAuthenticated = props.userAuthenticated;
    const firebaseUIConfig = {
        signInOptions: [
            { provider: EmailAuthProvider.PROVIDER_ID, requiredDisplayName: true },
            { provider: GoogleAuthProvider.PROVIDER_ID }
        ],
        signInFlow: 'popup', //don't redirect to authenticate
        credentialHelper: 'none', //don't show the email account chooser
        callbacks: { //"lifecycle" callbacks
            signInSuccessWithAuthResult: () => {
            return false; //don't redirect after authentication
            }
        }
    }
    
    if(userAuthenticated){
        return <Navigate to="/discover"/>;
    }

    return (
        <div>
            <div className="discover-header">
                <h1 className="title-text primary-text">Discover PNW</h1>
                <h2 className="secondary-text">Sign in to find your next trip</h2>
            </div>
            <StyledFirebaseAuth firebaseAuth={auth} uiConfig={firebaseUIConfig}/>
        </div>
    )
}

export default LogInPage