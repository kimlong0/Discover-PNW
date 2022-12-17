import { useNavigate } from 'react-router-dom';
import CardListVanilla from '../CardList';
import IconHeart from '../icons/Heart';
import 'react-toastify/dist/ReactToastify.css';

function NoFavoriteMessage() {
    const navigate = useNavigate();
    return(
        <div className='container d-flex flex-column align-items-center justify-content-between'>
            <h2 className='cards-favorites-detail'>It appears there are no favorited activites.</h2>
            <button className='go-favorite-button' onClick={() => navigate('/discover')}>Go favorite some activites!</button>
            <button className='go-favorite-heart-button' onClick={() => navigate('/discover')}>
                <IconHeart favorite={true}/>
            </button>
        </div>
    );
}

function MyActivitiesPage(props) {
    const locationData = props.locationData;
    const favoritedLocation = props.favoritedLocations;

    // filter through location dataset and return only favorited locations.
    const filteredLocationData = locationData.filter((location) => {
        return isFavorited(location.name);
    })

    function isFavorited(locationName) {
        for (let locationObj in favoritedLocation) {
            if (favoritedLocation[locationObj].name === locationName) {
                return true;
            }
        }
        return false;
    }

    return (
        <div>
            <section>
                <header className='container d-flex flex-column align-items-center'>
                    <h1 className="cards-header">My Adventures</h1>
                </header>
            </section>
            {/* Ternary Operator: If there are no favorite locations, display <NoFavoriteMessage /> */}
            {filteredLocationData.length > 0 ? <CardListVanilla 
                currentUserId={props.currentUserId}
                locations={filteredLocationData} 
                favoritedLocations={props.favoritedLocations} 
            /> : <NoFavoriteMessage />}
        </div>
    );
}

export default MyActivitiesPage