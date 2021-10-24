const Pagination = (props) => {
    const pages = [];
    
    for(let i = props.start; i < props.size + props.start; i++) {
        let current = false;

        if(i === props.start && i > 1) {
            pages.push(<li className="pagination__item prev"><a href={`/?page=${i - 1}`}>{`<< Prev Page`}</a></li>);
        }

        if(i === props.start) {
            current = true;
        }

        pages.push(<li className={`pagination__item ${current ? 'current' : ''}`}><a href={`/?page=${i}`}>{i}</a></li>);

        if(i === props.size + props.start - 1) {
            pages.push(<li className="pagination__item next"><a href={`./?page=${i + 1}`}>{`Next Page >>`}</a></li>);
        }
    }

    return(
        <div className="pagination">
            <ul>
                {pages}
            </ul>
        </div>
    )
}

export default Pagination;