const Gallery = ({images}) => {
    return(
        <div className="gallery">
            {
                images.map((item) => {
                    return <div className="gallery_item" key={item.image.url}><img src={item.image.url} alt=""/></div>
                })
            }
        </div>
    )
}

export default Gallery;