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
        const db = getDatabase(); //"the database"
        const userFavoriteRef = ref(db, "userData/" + currentUserId + "/favoriteLocations");

        // Before pushing to firebase, if not favorited -> adds to firebase, else -> remove location from firebase
        if (!isFavorited()) {
            firebasePush(userFavoriteRef, locationData.name).catch((error) => console.log(error));
        } else {
            let locationId = "";
            for (let locationObj in favoritedLocations) {
                if (locationData.name === favoritedLocations[locationObj].name) {
                    locationId = favoritedLocations[locationObj].id;
                }
            }
            const existingFavoritedRef = ref(db, "userData/" + currentUserId + "/favoriteLocations/" + locationId);
            toast(`Removed ${locationData.name} from My Adventures.`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
            });
            
            firebaseRemove(existingFavoritedRef).catch((error) => {
                console.log(error);
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
        <Link to={locationData.name}>
            <div className="location-card">
                <div className="card">
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
                </div>
            </div>
            <ToastContainer closeButton={false}/>
        </Link>
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
        </section>
    );
}

export default CardListVanilla