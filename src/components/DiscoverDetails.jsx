import { useParams } from 'react-router-dom';
import IconHeart from './icons/Heart'
import { getDatabase, ref, push as firebasePush, remove as firebaseRemove} from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DiscoverDetails(props){
    const locationNameString = useParams().locationName;
    const currentUserId = props.currentUserId;
    const favoritedLocations = props.favoritedLocations;
    const locationData = props.locationData;
    const myActivites = props.myActivites;

    // Take in the given React route params (location name) and finds the corresponding location object in locationData.
    const selectedDetailslocation = locationData.find(location => location.name === locationNameString);

    const iFrameValues = {
        "Mount Rainier" : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10914.24901789913!2d-121.76907766162454!3d46.8523066162682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490d193f70860fb%3A0x5b5e4fe17ad6b707!2sMount%20Rainier!5e0!3m2!1sen!2sus!4v1670626483890!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
    
        "Mailbox Peak Hiking Loop"  : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10789.653845569943!2d-121.64803006126469!3d47.46237181680406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490806692cb2641%3A0xf084430ce2a66a1d!2sMailbox%20Peak!5e0!3m2!1sen!2sus!4v1670626864822!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
    
        "Crater Lake" : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46731.88233001914!2d-122.14235945818712!3d42.94155206279146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54c63e84c023ab41%3A0xbae1bf19c88b877a!2sCrater%20Lake!5e0!3m2!1sen!2sus!4v1670626900737!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
    
        "Space Needle"  : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.2893592743762!2d-122.35146608449125!3d47.62050627918556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490151f4ed5b7f9%3A0xdb2ba8689ed0920d!2sSpace%20Needle!5e0!3m2!1sen!2sus!4v1670626918971!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
    
        "Olympic National Park"  : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d343254.8641936968!2d-123.92037682546776!3d47.76828761674375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548e8009cf0472d1%3A0x2087abb27d7951!2sOlympic%20National%20Park!5e0!3m2!1sen!2sus!4v1670626935136!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
    
        "Leavenworth"  : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21527.064464227282!2d-120.67799208422215!3d47.5895166177295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549a4d92a4f8f98d%3A0xa14f95fb0abfef7e!2sLeavenworth%2C%20WA%2098826!5e0!3m2!1sen!2sus!4v1670626963520!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
    
        "Mount St. Helens"  : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11047.830942096074!2d-122.2043055620102!3d46.19139971585855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54969956568a2691%3A0x69ddb4f4b6cf94c7!2sMt%20St%20Helens!5e0!3m2!1sen!2sus!4v1670626984787!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        
        "Bainbridge Island"  : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172012.39171123615!2d-122.65682701839037!3d47.65152029321094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54903c3256128b2b%3A0xdfa86644a0f0930e!2sBainbridge%20Island%2C%20WA!5e0!3m2!1sen!2sus!4v1670627004154!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
    
        "Orcas Island"  : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d84346.32172671506!2d-122.95626637238784!3d48.651509719049365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54858607920f6f79%3A0x4ec697b75e1ec386!2sOrcas%20Island!5e0!3m2!1sen!2sus!4v1670627018737!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        
        "Winthrop"  : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21161.265138044135!2d-120.19888553210343!3d48.4726801720849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549cafa623b96aab%3A0x28449a3362c3528d!2sWinthrop%2C%20WA%2098862!5e0!3m2!1sen!2sus!4v1670627032018!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        
        "Lake Chelan"  : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21161.265138044135!2d-120.19888553210343!3d48.4726801720849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549b6e5c2423ec89%3A0x12b01686f76f1de0!2sLake%20Chelan!5e0!3m2!1sen!2sus!4v1670627048450!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        
        "Oregon Winterfest"  : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2858.4919433123796!2d-121.18753048461315!3d44.23811737910552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54b8d593c3926817%3A0xd3de392046e49202!2sOregon%20WinterFest!5e0!3m2!1sen!2sus!4v1670627062120!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        
        "Julyamsh Powwow"  : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2699.271475961911!2d-116.97599918449849!3d47.426149579173064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5361c568005417dd%3A0x5a6d640fe622efea!2sCoeur%20d&#39;Alene%20Casino!5e0!3m2!1sen!2sus!4v1670627088221!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        
        "Pendleton Round-Up"  : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2788.0730852511915!2d-118.80485666511234!3d45.6694331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54a2e144df944327%3A0x3cc276194a91de35!2sPendleton%20Roundup%20Grandstand!5e0!3m2!1sen!2sus!4v1670627107519!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
    
        "Multnomah Falls" : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2792.713728212709!2d-122.1179249345657!3d45.576195129102345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5495eb1e945a5877%3A0x1eeaf88627083bc6!2sMultnomah%20Falls!5e0!3m2!1sen!2sus!4v1670627121884!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        
        "Snoqualmie Falls" : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2693.3458252494042!2d-121.83978558449424!3d47.54159767918031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54907bd11b8d91c1%3A0xed0ab0625a0dad38!2sSnoqualmie%20Falls!5e0!3m2!1sen!2sus!4v1670627137020!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
    
        "North Cascades"  : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d336579.5299922339!2d-121.85876753437498!3d48.771817399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548512b8506cf411%3A0x52084fb0ae6433ed!2sNorth%20Cascades%20National%20Park!5e0!3m2!1sen!2sus!4v1670627158316!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        
        "Astoria" : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44191.23263952389!2d-123.84993237855844!3d46.1915130536207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54937b440995fb8b%3A0xf7dd72f1a11b8abf!2sAstoria%2C%20OR%2097103!5e0!3m2!1sen!2sus!4v1670627169618!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        
        "Deception Pass State Park" : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10594.522390620212!2d-122.65466211070128!3d48.40603676793043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54857cb695cdccc9%3A0x8aaa1a3a26a21aad!2sDeception%20Pass!5e0!3m2!1sen!2sus!4v1670627180616!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        
        "Skagit Valley Tulip Festival" : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2648.027202054207!2d-122.34030218446158!3d48.4176220792468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54856eafe293103d%3A0x119f42a2d1df738d!2sSkagit%20Valley%20Tulip%20Festival!5e0!3m2!1sen!2sus!4v1670627194017!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        
        "Portland" : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178840.48675004503!2d-122.79448494835451!3d45.54262834167228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950b0b7da97427%3A0x1c36b9e6f6d18591!2sPortland%2C%20OR!5e0!3m2!1sen!2sus!4v1670627204349!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
        
        "Port Townsend" : "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42614.99582273792!2d-122.8176216101871!3d48.12109078072384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x548fe9a4d291b6fd%3A0xf5e669eab50680c0!2sPort%20Townsend%2C%20WA%2098368!5e0!3m2!1sen!2sus!4v1670627215467!5m2!1sen!2sus\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>"
    }

    if (!selectedDetailslocation) { 
        return (<h1>No location specified</h1>);
    }

    const handleClick = (event) => {
        // To prevent from activating the main <a> tag surrounding the card.
        event.preventDefault();

        if (currentUserId) {
            const db = getDatabase(); //"the database"
            
            // Before pushing to firebase, if not completed activity -> adds to firebase, else -> remove completed activity from firebase
            if (!isMyActivity()) {
                const userCompletedRef = ref(db, "userData/" + currentUserId + "/adventureCompleted");
                firebasePush(userCompletedRef, selectedDetailslocation.name)
                .then(() => {
                    toast.success(`Added ${locationNameString} to Completed Adventures.`, {
                        position: "top-center",
                        autoClose: 2000,
                        });
                }).catch((error => {
                    console.log(error);
                }));
            } else {
                let completedActivityId = "";
                for (let activityObj in myActivites) {
                    if (selectedDetailslocation.name === myActivites[activityObj].name) {
                        completedActivityId = myActivites[activityObj].id;
                    }
                }
                const existingCompletedActivityRef = ref(db, "userData/" + currentUserId + "/adventureCompleted/" + completedActivityId);
                firebaseRemove(existingCompletedActivityRef)
                .then(() => {
                    toast.info(`Removed ${locationNameString} from Completed Adventures.`, {
                        position: "top-center",
                        autoClose: 2000,
                    });
                }).catch((error) => {
                    console.log(error);
                });
            }
        } else {
            toast.warning(`Please Login to Complete Adventure`, {
                position: "top-center",
                autoClose: 2000,
            });
        }
    };
    
    // If location is in myActivites Array return true, else false.
    function isMyActivity() {
        for (let activityObj in myActivites) {
            if (selectedDetailslocation.name === myActivites[activityObj].name) {
                return true;
            }
        }
        return false;
    }

    function handleFavorite() {
        if (currentUserId) {
            const db = getDatabase();
            
            // Before pushing to firebase, if not favorited -> adds to firebase, else -> remove location from firebase
            if (!isFavorited()) {
                const userFavoriteRef = ref(db, "userData/" + currentUserId + "/favoriteLocations");
                firebasePush(userFavoriteRef, selectedDetailslocation.name).catch((error) => {
                    console.log(error);
                }).then(
                    toast.success(`Added ${locationNameString} to My Adventures.`, {
                        position: "top-center",
                        autoClose: 2000,
                    })
                );
    
            } else {
                let locationId = "";
                for (let locationObj in favoritedLocations) {
                    if (selectedDetailslocation.name === favoritedLocations[locationObj].name) {
                        locationId = favoritedLocations[locationObj].id;
                    }
                }
                const existingFavoritedRef = ref(db, "userData/" + currentUserId + "/favoriteLocations/" + locationId);
                firebaseRemove(existingFavoritedRef).catch((error) => {
                    console.log(error);
                }).then(
                    toast.info(`Removed ${locationNameString} from My Adventures.`, {
                        position: "top-center",
                        autoClose: 2000,
                    })
                );
            }
        } else {
            toast.warning(`Please Login to Favorite`, {
                position: "top-center",
                autoClose: 2000,
            });
        }
    }

    // If location is in favoratedLocations Array return true, else false.
    function isFavorited() {
        for (let locationNames in favoritedLocations) {
            if (selectedDetailslocation.name === favoritedLocations[locationNames].name) {
                return true;
            }
        }
        return false;
    } 

    function buttonText() {
        return isMyActivity() ? 'Adventure Completed' : 'Complete Adventure';
    }

    // Display correct medal based on activity
    const medal = selectedDetailslocation.medal;
    let medalImageSource = '';
    if (medal === 'Gold') {
        medalImageSource = '/img/gold-medal.png';
    } else if (medal === 'Silver') {
        medalImageSource = '/img/silver-medal.png';
    } else {
        medalImageSource = '/img/bronze-medal.png';
    }

    return (
        <main>
            <section>
                <div className="image-container">
                    <img src={selectedDetailslocation.img} className="img-fluid" alt={selectedDetailslocation.name}/>
                    <div className='info-wrapper'>
                        <div className="discover-text-container d-flex flex-row ">
                            <div className="location-text d-flex flex-column me-auto">
                                <h1>{selectedDetailslocation.name}</h1>
                                <h2 className="location-subtext">{selectedDetailslocation.location}</h2>
                            </div>
                            <div className="activity-card">
                                <img src={medalImageSource} alt={medalImageSource + " medal"}></img>
                                <div className="activity-description">
                                    <p className="activity-title fw-bold">{selectedDetailslocation.medal + " Medal Adventure"}</p>
                                </div>
                                <button className='favorite-heart-button' onClick={handleFavorite}>
                                    <IconHeart favorite={isFavorited()}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='info-wrapper'>
                    <p className="discover-detail-text">
                        {selectedDetailslocation.description}
                    </p>
                    <div className="button-container">
                        <button onClick={handleClick} type="button" className={isMyActivity() ? "btn btn-secondary btn-xl btn-block" : "btn btn-success btn-xl btn-block"}>{buttonText()}</button>
                    </div>
                <div className="iframe-container d-flex justify-content-center" dangerouslySetInnerHTML={{__html: iFrameValues[locationNameString]}} ></div>
            
                </div>
            </section>
            <ToastContainer closeButton={false} newestOnTop/>
        </main>
    );
}













