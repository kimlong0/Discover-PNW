import IconHeart from './icons/Heart';
import { Link } from 'react-router-dom';
import { getDatabase, ref, push as firebasePush, remove as firebaseRemove} from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Card(props) {
    const locationData = props.location;
    const currentUserId = props.currentUserId;
    const favoritedLocations = props.favoritedLocations;

    function handleFavorite(event) {
        // To prevent from activating the main <a> tag surrounding the card.
        event.preventDefault();
        const db = getDatabase(); //"the database"
        const userFavoriteRef = ref(db, "userData/" + currentUserId + "/favoriteLocations");

        // Before pushing to firebase, if not favorited -> adds to firebase, else -> remove location from firebase
        if (currentUserId) {
            if (!isFavorited()) {
                firebasePush(userFavoriteRef, locationData.name).then(
                    toast.success(`Added ${locationData.name} to My Adventures.`, {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        })
                );
            } else {
                let locationId = "";
                for (let locationObj in favoritedLocations) {
                    if (locationData.name === favoritedLocations[locationObj].name) {
                        locationId = favoritedLocations[locationObj].id;
                        // toast pop up
                        toast(`Removed ${locationData.name} from My Adventures.`, {
                            position: "bottom-right",
                            autoClose: 2000,
                            hideProgressBar: true,
                        });
                    }
                }
                const existingFavoritedRef = ref(db, "userData/" + currentUserId + "/favoriteLocations/" + locationId);
                firebaseRemove(existingFavoritedRef)
                .catch((error) => {
                    console.log(error);
                });
            }
        } else {
            toast.warning(`Please Login to Favorite`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
            });
        }
    }

    // If location is in favoratedLocations Array return true, else false.
    function isFavorited() {
        if (favoritedLocations === null) {
            return false;
        }

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
                <Link to={'/discover/' + locationData.name}>
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

export default function CardList(props) {
    const locations = props.locations;
    const currentFilters = props.currentFilters;

    const locationCardsElements = locations.map((location) => {
        const card = <Card 
            key={location.name}
            currentUser={props.currentUser}
            currentUserId={props.currentUserId} 
            location={location}   
            favoritedLocations={props.favoritedLocations}
        />
        
        if(currentFilters.length === 0){
            return card;
        } else {
            for(let i = 0; i < currentFilters.length; i++){
                if(location.category.includes(currentFilters[i])){
                    return card;
                } 
            }
            return null;
        }
    })
    return (
        <section>
            <div className="cards">
                <div className="cards-wrapper">
                    {locationCardsElements}
                </div>
            </div>
            <ToastContainer closeButton={false}/>
        </section>
    );
}