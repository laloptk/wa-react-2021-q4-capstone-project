import Card from "./Card";

const Grid = (props) => {    
    return(
        <div className="grid" >            
            {
                props.products.map((gridItem) => {
                    return <Card {...gridItem } key={gridItem.id}/>
                })
            }        
        </div>
    )
}

export default Grid;