import Card from "./Card";
import Button from "./Button";

const Grid = (props) => {    
    return(        
        <div className="grid" > 
            <div className="grid__wrap">           
                {
                    props.products.map((gridItem) => {
                        return <Card {...gridItem } key={gridItem.id}/>
                    })
                }        
            </div>
            <Button link="#" text="View All Products" btnModifier="btn--ghost" />
        </div>
    )
}

export default Grid;