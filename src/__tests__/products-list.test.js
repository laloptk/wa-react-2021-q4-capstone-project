import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import { useFeaturedCategories } from "../utils/hooks/useFeaturedCategories";
import { useProducts } from "../utils/hooks/useProducts";
import ListingContent from '../components/ListingContent';
import categoriesData from '../../public/product-categories.json';
import productsData from '../../public/products.json';

jest.mock("../utils/hooks/useFeaturedCategories", () => ({
    useFeaturedCategories: jest.fn(() => ({categories: null, categoriesLoading: true}))
})).mock("../utils/hooks/useProducts", () => ({
    useProducts: jest.fn(() => ({products: null, productsLoading: true}))
}));

beforeEach(() => {
    useFeaturedCategories.mockReturnValue({categories: categoriesData, categoriesLoading: false});
    useProducts.mockReturnValue({products: productsData, productsLoading: false});
});

test('Check sidebar categories are rendering and that the filter buttons work', async () => {
    const furnitureProducts = productsData.results.filter((product) => {
        return product.data.category.slug === 'furniture';
    });
    console.log(furnitureProducts.length);
    render(<Router><ListingContent /></Router>);
    const filterBtn = screen.getByText('Furniture');
    expect(filterBtn).toBeInTheDocument();
    fireEvent.click(filterBtn);
    const catProducts = screen.getAllByText('Category: Furniture');
    //Check that the number of rendered products is equal to the lenght of the data passed
    expect(catProducts.length).toBe(furnitureProducts.length);
});