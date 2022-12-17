import {useState} from 'react';
import DiscoverHeader from '../DiscoverHeader.jsx';
import CardListVanilla from '../CardList.jsx';

function DiscoverPage(props) {
  const [currentFilters, setFilters] = useState([]);
  const locationsData = props.locationData;  
  let filteredLocationData = props.locationData;

  if (currentFilters.length) {
    filteredLocationData = locationsData.filter((location) => {
      return isSelected(location);
    })
  }

  function isSelected(location) {
    for(let i = 0; i < currentFilters.length; i++){
      if(location.category.includes(currentFilters[i])){
          return true;
      } 
    }
    return false;
  }

  return (
    <div>
        <DiscoverHeader setFiltersFunction={setFilters} currentFilters={currentFilters}/>
        <section>
          <h2 className="cards-header">Popular Adventures</h2>
        </section>
        <CardListVanilla 
          currentUserId={props.currentUserId}
          locations={filteredLocationData} 
          favoritedLocations={props.favoritedLocations} 
        />
    </div>
  )
}

export default DiscoverPage