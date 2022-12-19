import IconMountainsSun from './icons/IconMountainsSun';
import IconCity from './icons/City';
import IconLandmark from './icons/Landmark';
import IconEvent from './icons/Event';

export default function DiscoverHeader(props) {
    const filterNames = ["Nature", "City", "Landmark", "Event"];
    const filterIcons = [<IconMountainsSun/>, <IconCity/>, <IconLandmark/>, <IconEvent/>];
    const setFilter = props.setFiltersFunction;
    const currentFilters = props.currentFilters;

    const filterButtonList = filterNames.map((location, index) => {
        return(
            <button className="btn quick-filters-btn" key={location} id={location} onClick={(event) => {
                adjustFilters(event, setFilter, currentFilters);
            }}>
                <span>{filterIcons[index]}</span>
                <div>{location}</div>
            </button>
        )
    })

    return (
        <header>
            <section>
                <div className="discover-header">
                    <h1 className="title-text primary-text">Discover</h1>
                    <h2 className="secondary-text">Find your next trip</h2>
                </div>
                <div className="quick-filters btn-group btn-group-toggle" data-toggle="buttons">
                    {filterButtonList}
                </div>
            </section>
        </header>
    );
}

function adjustFilters(event, setFilterCallback, currentFilters){
    const button = event.currentTarget;
    
    if(button.classList.contains("active")){
        button.classList.remove("active");
        setFilterCallback(currentFilters.filter((value) => {
            console.log(value !== button.id);
            return value !== button.id;
        }));
    } else {
        button.classList.add("active");
        setFilterCallback([...currentFilters, button.id]);
    }
}