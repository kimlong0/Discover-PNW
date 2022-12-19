import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue} from 'firebase/database';

// Components
import Navbar from './Navbar';
import Footer from './Footer';
import DiscoverDetails from './DiscoverDetails';
import Loading from './icons/Loading';

// Pages
import DiscoverPage from './pages/DiscoverPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import ErrorPage from './pages/ErrorPage';
import MyActivitiesPage from './pages/MyActivitiesPage';
import LogInPage from './pages/LogInPage';

function App() {
  const [favoritedLocations, setFavoritedLocations] = useState([]);
  const [myActivites, setMyActivities] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isQuerying, setIsQuerying] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    //READING IN DATA FROM JSON FILE
    setIsQuerying(true);
    fetch('/data/pnw-locations.json').catch((error) => {
      console.log(error);
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setLocationData(data);
    })
  }, [])

  useEffect(() => {
    //SETTING UP FIREBASE AUTH LISTENER 
    
    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUser) => {
      if(firebaseUser){
        // Configuring firebase currentUser object

        // Spliting display name to get first and last name
        const nameArray = firebaseUser.displayName.split(" ");
        firebaseUser.userImg = firebaseUser.photoURL || '/img/null-user.png';
        firebaseUser.firstName = nameArray[0];
        
        // Getting last name -accounts for space in last name and empty last name.
        nameArray.shift();
        const lastName = nameArray.join();
      
        // creating local firebase user object
        firebaseUser.lastName = lastName;
        firebaseUser.id = firebaseUser.uid;
        
        // Setting Local State
        setCurrentUser(firebaseUser, databaseListen(firebaseUser.uid));
        setUserAuthenticated(true);
      } else {
        setCurrentUser("");
        setUserAuthenticated(false);
      }
      setIsQuerying(false)
    })
  }, [])

  function databaseListen(userId) {
    const db = getDatabase();
    const likedLocationRef = ref(db, "userData/" + userId + "/favoriteLocations");
    const userCompletedRef = ref(db, "userData/" + userId + "/adventureCompleted");

    onValue(likedLocationRef, (snapshot) => {
      const LocationDataObj = snapshot.val();
      if (LocationDataObj !== null) {
        const objKeys = Object.keys(LocationDataObj);
        const locationArray = objKeys.map((keyString) => {
          const locationObj = {};
          const favoriteLocation = LocationDataObj[keyString];
          locationObj.id = keyString;
          locationObj.name = favoriteLocation;
          return locationObj;
        })
        setFavoritedLocations(locationArray);
      } else {
        setFavoritedLocations([]);
      }
    })

    onValue(userCompletedRef, (snapshot) => {
      const CompletedDataObj = snapshot.val();
      if (CompletedDataObj !== null) {
        const objKeys = Object.keys(CompletedDataObj);
        const myActivitesArray = objKeys.map((keyString) => {
          const activityObj = {};
          const savedActivity = CompletedDataObj[keyString];
          activityObj.id = keyString;
          activityObj.name = savedActivity;
          return activityObj;
        })
        setMyActivities(myActivitesArray); 
      } else {
        setMyActivities([])
      }
    });
  }

  function resetLocalState() {
    setFavoritedLocations([]);
    setCurrentUser({});
    setMyActivities([]);
    setUserAuthenticated(false);
  }

  return (
    <div className="App">
      <Navbar/>
      <main>
        {isQuerying && <LoadingIconWrapper />}
        <Routes>
          <Route path='/' element={<Navigate to='discover'/>} />
          <Route path='login' element = {<LogInPage userAuthenticated={userAuthenticated}/>}></Route>
          <Route path='discover' element={<DiscoverPage locationData={locationData} currentUserId={currentUser.id} favoritedLocations={favoritedLocations}/>}/>
          <Route path='discover/:locationName' element={<DiscoverDetails locationData={locationData} currentUserId={currentUser.id} favoritedLocations={favoritedLocations} myActivites={myActivites}/>}/>
          <Route path='*' element={<ErrorPage />}/>
          
          {/* Protected Routes */}
          <Route element={<ProtectedPage currentUser={currentUser} />}>
            <Route path='profile' element={<ProfilePage currentUser={currentUser} resetLocalState={resetLocalState} myActivites={myActivites} locationData={locationData}/>}/>
            <Route path='/edit-profile' element={<EditProfilePage currentUser={currentUser}/>}/>
            <Route path='activities' element={<MyActivitiesPage locationData={locationData} currentUserId={currentUser.id} favoritedLocations={favoritedLocations}/>}/>
            <Route path='activities/:locationName' element={<DiscoverDetails locationData={locationData} currentUserId={currentUser.id} favoritedLocations={favoritedLocations} myActivites={myActivites}/>}/>
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function ProtectedPage(props) {
  if (!props.currentUser) {
    return <Navigate to="/login" />
  } else {
    return <Outlet />
  }
}

function LoadingIconWrapper() {
  return (
    <div className='loading-icon-wrapper'>
      <Loading />
    </div>
  )
}

export default App;