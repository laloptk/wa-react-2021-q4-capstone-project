import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Home from '../components/Home';
import categoriesData from '../../public/product-categories.json';
import bannersData from '../../public/featured-banners.json';
import productsData from '../../public/featured-products.json';
import { useFeaturedBanners } from "../utils/hooks/useFeaturedBanners";
import { useFeaturedCategories } from "../utils/hooks/useFeaturedCategories";
import { useFeaturedProducts } from "../utils/hooks/useFeaturedProducts";

jest.mock("../utils/hooks/useFeaturedBanners", () => ({
    useFeaturedBanners: jest.fn(() => ({banners: null, bannersLoading: true}))
})).mock("../utils/hooks/useFeaturedCategories", () => ({
    useFeaturedCategories: jest.fn(() => ({categories: null, categoriesLoading: true}))
})).mock("../utils/hooks/useFeaturedProducts", () => ({
    useFeaturedProducts: jest.fn(() => ({products: null, productsLoading: true}))
}));

beforeEach(() => {
    useFeaturedBanners.mockReturnValueOnce({banners: bannersData, bannersLoading: false});
    useFeaturedCategories.mockReturnValueOnce({categories: categoriesData, categoriesLoading: false});
    useFeaturedProducts.mockReturnValueOnce({products: productsData, productsLoading: false});
});

describe("Test the different Home components are rendering", () => {
    
    it('The SimpleSlider with featured banners render in Home', async () => { 
        render(<Router><Home /></Router>);           
        const bannerImage = screen.getAllByAltText('AMAZING FINISHES - BEDROOM');
        expect(bannerImage[0]).toBeInTheDocument();
        const bannerTitles = screen.getAllByText('AMAZING FINISHES - BEDROOM');
        expect(bannerTitles[0]).toBeInTheDocument();
    });   
    
    it("The Carousel in Home renders", async () => {   
        render(<Router><Home /></Router>);      
        const categoryImage = screen.getAllByAltText('Bath');
        expect(categoryImage[0]).toBeInTheDocument();
        const categoryTitle = screen.getAllByText('Bed & Bath');
        expect(categoryTitle[0]).toBeInTheDocument();
    });

    it("The featured products are rendering in Home", async () => {   
        render(<Router><Home /></Router>);      
        const productImage = screen.getByAltText('Tyler Poly Reclining Leather Armchair');
        expect(productImage).toBeInTheDocument();
        const productTitle = screen.getByText('Tyler Poly Reclining Leather Armchair');
        expect(productTitle).toBeInTheDocument();
    });
});
    
