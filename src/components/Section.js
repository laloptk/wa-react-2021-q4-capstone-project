const Section = (props) => {
    return(
        <section className={`section ${props.sectionName}`}>
            <div className="container">
                <div className="section__header">
                    <h2>{props.sectionTitle}</h2>
                </div>
                {props.children}
            </div>            
        </section>
    )
}

export default Section;