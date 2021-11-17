import useQuery from "../utils/hooks/useQuery";
import PaginationItem from "./PaginationItem";

const Pagination = ({size, pageSlug, currentPage, total}) => {
    const query = useQuery();
    const searchQuery = query.get('q') ? `?q=${query.get('q')}` : "";
    const range = new Array(size);

    return(
        <div className="pagination">
            <ul>
                {
                    range.fill(0, 0).map((num, index) => {
                        const currPage = index + currentPage;
                        let attributes = {};

                        if(total > 1) {
                            if(currPage === currentPage) {
                                attributes = {
                                    modifier: "prev",
                                    key: new Date().getTime(),
                                    slug: `/${pageSlug}/${currPage - 1}${searchQuery}`,
                                    text: '<< Prev Page'
                                }
                            }                        
                                        
                            if(total <= 2) {
                                attributes = {
                                    modifier: currPage === currentPage ? 'current' : '',
                                    key: new Date().getTime() + currPage,
                                    slug: `/${pageSlug}/${currPage}${searchQuery}`,
                                    text: currPage
                                }
                            }                                          
                        
                            if(currPage === (currentPage - 1)) {
                                attributes = {
                                    modifier: 'next',
                                    key: new Date().getTime(),
                                    slug: `/${pageSlug}/${currPage + 1}${searchQuery}`,
                                    text: 'Next Page >>'
                                } 
                            }
                        }                         
                            
                        return <PaginationItem {...attributes} />
                        
                    })
                }
            </ul>
        </div>
    )
}

export default Pagination;