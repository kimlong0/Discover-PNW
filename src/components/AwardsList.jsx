function AwardCard(props) {
    const textColor = props.medal.toLowerCase();
    return(
    <div className="award-card d-flex align-items-center card mx-3 shadow border-0 rounded-5 pt-4 mb-5">
        <img className="award-medal" src={props.image} alt={props.medal + " medal"}></img>
        <div className="card-body d-flex flex-column py-0">
            <h5 className="card-title fw-bold">{props.medal}</h5>
            <p className={`medals-count ${textColor}-medal`}>{props.count}</p>
        </div>
    </div>
    );
}

function AwardsList(props) {
    const goldCount = props.goldCount;
    const silverCount = props.silverCount;
    const bronzeCount = props.bronzeCount;

    const medalsArray = [
        {
            tier:'Gold',
            image:'/img/gold-medal.png',
            count:goldCount
        },
        {
            tier:'Silver',
            image:'/img/silver-medal.png',
            count:silverCount
        },
        {
            tier:'Bronze',
            image:'/img/bronze-medal.png',
            count:bronzeCount
        },
    ]

    const medalsElements = medalsArray.map((medal) => {
        return (
            <AwardCard
                key={medal.tier} 
                medal={medal.tier}
                image={medal.image}
                count={medal.count}
            />
        );
    })

  return (
    <div className="awards container">
        <div className="d-flex justify-content-center">
            {medalsElements}
        </div>
    </div>
  )
}

export default AwardsList