import IconHeart from './icons/Heart';
import { Link } from 'react-router-dom';
import { getDatabase, ref, push as firebasePush, remove as firebaseRemove} from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CardVanilla(props) {
    const locationData = props.location;
    const currentUserId = props.currentUserId;
    const favoritedLocations = props.favoritedLocations;
    
    function handleFavorite(event) {
        // To prevent from activating the main <a> tag surrounding the card.
        event.preventDefault();
        if (currentUserId) {
            const db = getDatabase(); //"the database"
             
            // Before pushing to firebase, if not favorited -> adds to firebase, else -> remove location from firebase
            if (!isFavorited()) {
                const userFavoriteRef = ref(db, "userData/" + currentUserId + "/favoriteLocations");
                firebasePush(userFavoriteRef, locationData.name)
                .catch((error) => console.log(error))
                .then(
                    toast.success(`Added ${locationData.name} to My Adventures.`, {
                        position: "top-center",
                        autoClose: 2000,
                    })
                );
            } else {
                let locationId = "";
                for (let locationObj in favoritedLocations) {
                    if (locationData.name === favoritedLocations[locationObj].name) {
                        locationId = favoritedLocations[locationObj].id;
                    }
                }
    
                // Creating existing ref from database
                const existingFavoritedRef = ref(db, "userData/" + currentUserId + "/favoriteLocations/" + locationId);
                firebaseRemove(existingFavoritedRef)
                .catch((error) => {
                    console.log(error);
                })
                .then(
                    toast.info(`Removed ${locationData.name} from My Adventures.`, {
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
        for (let locationObj in favoritedLocations) {
            if (locationData.name === favoritedLocations[locationObj].name) {
                return true;
            }
        }
        return false;
    }

    return (
        <div className="location-card">
            <div className="card">
                <Link to={locationData.name}>
                    <div className="text-image-container">
                        <img src={locationData.img} className="card-img-top" alt={locationData.name}></img>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="card-title">{locationData.name}</h5>
                                <button className='favorite-heart-button' onClick={handleFavorite}>
                                    <IconHeart favorite={isFavorited()}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

function CardListVanilla(props) {
    const locations = props.locations;
    const locationCardsElements = locations.map((location) => {
        return (
            <CardVanilla 
                key={location.name}
                currentUserId={props.currentUserId}
                location={location}
                favoritedLocations={props.favoritedLocations}
            />
        );
    })
    return (
        <section>
            <div className="cards">
                <div className="cards-wrapper">
                    {locationCardsElements}
                </div>
            </div>
            <ToastContainer closeButton={false} newestOnTop />
        </section>
    );
}

export default CardListVanilla