import {useState} from 'react';
import DiscoverHeader from '../DiscoverHeader.jsx';
import CardList from '../CardList.jsx';

function DiscoverPage(props) {
  const [currentFilters, setFilters] = useState([]);

  return (
    <div>
        <DiscoverHeader setFiltersFunction={setFilters} currentFilters={currentFilters}/>
        <section>
          <h2 className="cards-header">Popular Adventures</h2>
        </section>
        <CardList 
          currentUser={props.currentUser}
          currentUserId={props.currentUserId}
          locations={props.locationData} 
          currentFilters={currentFilters}
          favoritedLocations={props.favoritedLocations}
        />
    </div>
  )
}

export default DiscoverPage