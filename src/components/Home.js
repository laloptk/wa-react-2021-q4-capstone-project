import Grid from "./Grid";
import Section from "./Section";
import SimpleSlider from "./SimpleSlider";
import Carousel from "./Carousel";
import Button from "./Button";
import { useFeaturedBanners } from "../utils/hooks/useFeaturedBanners";
import { useFeaturedCategories } from "../utils/hooks/useFeaturedCategories";
import { useFeaturedProducts } from "../utils/hooks/useFeaturedProducts";

const Home = (props) => {
    const {banners, bannersLoading} = useFeaturedBanners();
    const {categories, categoriesLoading} = useFeaturedCategories();
    const {products, productsLoading} = useFeaturedProducts();
    
    return(
        <div className="home">
            <Section sectionName="home__slider" sectionTitle="The Best of the Best...">
                <SimpleSlider items={ banners } isLoading={ bannersLoading } />
            </Section>
            <Section sectionName="home__carousel" sectionTitle="Featured Categories">
                <Carousel items={categories} isLoading={categoriesLoading} />
            </Section>
            <Section sectionName="home__grid" sectionTitle="Featured Products">                   
                <Grid title="Featured Products" products={products.results} isLoading={productsLoading}/>
                <Button link="/products" text="View All Products"  btnModifier="btn--solid" />                     
            </Section>
        </div>
    )
}

export default Home;
