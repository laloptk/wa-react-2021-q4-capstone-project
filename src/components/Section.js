const Section = ({sectionName, sectionTitle, children}) => {
    return(
        <section className={`section ${sectionName}`}>
            <div className="container">
                <div className="section__header">
                    <h2>{sectionTitle}</h2>
                </div>
                {children}
            </div>            
        </section>
    )
}

export default Section;