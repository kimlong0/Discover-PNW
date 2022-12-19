import ProfileInfo from '../ProfileInfo.jsx';
import AwardsList from '../AwardsList.jsx';
import { Link } from 'react-router-dom';

function ActivityCard(props) {
    const activity = props.activity;

    let medalImageSource = '';
    // Display correct medal based on activity
    if (activity.medal === 'Gold') {
        medalImageSource = '/img/gold-medal.png';
    } else if (activity.medal === 'Silver') {
        medalImageSource = '/img/silver-medal.png';
    } else {
        medalImageSource = '/img/bronze-medal.png';
    }

  return (
    <Link className='activity-card-link-wrapper' to={`/discover/${activity.name}`}>
        <div className="activity-card">
            <img src={medalImageSource} alt={activity.medalEarned + " medal"}></img>
            <div className="activity-description">
                <p className="activity-title fw-bold">Earned {activity.medal} Medal: {activity.name} {activity.location} </p>
            </div>
        </div>
    </Link>
  );
}

function ActivityList(props) {
    const completedActivities= props.completedActivities;
    const activitiesElements = completedActivities.map((activity) => {
        return (
            <ActivityCard 
                key={activity.name}
                activity={activity}
            />
        );
    });

    return (
    <div className="activity container">
        <div className="activity-card-wrapper">
            {activitiesElements}
        </div>
    </div>
    )
}

function ProfilePage(props) {
    let goldCount = 0;
    let silverCount = 0;
    let bronzeCount = 0;

    const myActivities = props.myActivites;
    const locationData = props.locationData;

    const filteredLocationData = locationData.filter((location) => {
        return isMyActivity(location.name);
    })

    for (let locationData in filteredLocationData) {
        const locationObj = filteredLocationData[locationData];
        if (locationObj.medal === 'Gold') {
            goldCount++;
        } else if (locationObj.medal === 'Silver') {
            silverCount++;
        } else {
            bronzeCount++;
        }
    }

    // If location is in myActivites Array return true, else false.
    function isMyActivity(locationName) {
        for (let activityObj in myActivities) {
            if (locationName === myActivities[activityObj].name) {
                return true;
            }
        }
        return false;
    }

  return (
    <div>
        <ProfileInfo currentUser={props.currentUser} resetLocalState={props.resetLocalState}/>
        <AwardsList goldCount={goldCount} silverCount={silverCount} bronzeCount={bronzeCount}/>
        <div className="discover-header">
            <h1 className="secondary-text">Completed Adventures</h1>
        </div>
        <ActivityList myActivities={myActivities} completedActivities={filteredLocationData}/>
    </div>
  )
}

export default ProfilePage