import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { useFeaturedCategories } from "../utils/hooks/useFeaturedCategories";
import { useProducts } from "../utils/hooks/useProducts";
import ListingContent from '../components/ListingContent';
import categoriesData from '../../mocks/en-us/product-categories.json';
import productsData from '../../public/products.json';
import productsData2 from '../../public/products2.json';
import productsData3 from '../../public/products3.json';

jest.mock("../utils/hooks/useFeaturedCategories", () => ({
    useFeaturedCategories: jest.fn(() => ({categories: null, categoriesLoading: true}))
})).mock("../utils/hooks/useProducts", () => ({
    useProducts: jest.fn(() => ({products: null, productsLoading: true}))
}));

beforeEach(() => {
    useFeaturedCategories.mockReturnValue({categories: categoriesData, categoriesLoading: false});
    useProducts.mockReturnValue({products: productsData, productsLoading: false});
});

it('Check sidebar categories are rendering and that the filter buttons work', async () => {
    const furnitureProducts = productsData.results.filter((product) => {
        return product.data.category.slug === 'furniture';
    });

    render(<Router><ListingContent /></Router>);

    const filterBtn = screen.getByText('Furniture');
    expect(filterBtn).toBeInTheDocument();

    fireEvent.click(filterBtn);

    const catProducts = screen.getAllByText('Category: Furniture');
    //Check that the number of rendered products is equal to the lenght of the data passed
    expect(catProducts.length).toBe(furnitureProducts.length);
});

it('Pagination buttons appear/disappear correctly when in first page', async () => {
    render(<Router><ListingContent /></Router>);
    expect(screen.queryByText('Prev Page')).toBeNull();
    const nextButton = screen.getByText('Next Page');
    expect(nextButton).toBeInTheDocument();    
});

it('Pagination buttons appear correctly when in a middle page', async () => {
    useProducts.mockReturnValueOnce({products: productsData3, productsLoading: false});
    render(<Router><ListingContent /></Router>);
    const nextButton = screen.getByText('Next Page');
    expect(nextButton).toBeInTheDocument();
    const prevButton = screen.getByText('Prev Page');
    expect(prevButton).toBeInTheDocument();    
});

it('Pagination buttons appear/disappear correctly when in last page', async () => {
    useProducts.mockReturnValueOnce({products: productsData2, productsLoading: false});
    render(<Router><ListingContent /></Router>);
    expect(screen.queryByText('Next Page')).toBeNull();
    const prevButton = screen.getByText('Prev Page');
    expect(prevButton).toBeInTheDocument();    
});