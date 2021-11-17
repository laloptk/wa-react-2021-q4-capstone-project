import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Grid from '../components/Grid';
import productsData from '../../public/featured-products.json';
import categoriesData from '../../public/product-categories.json';

const server = setupServer( 
    rest.get('/featured-products', (req, res, context) => {
        return res(context.json({
            products: productsData
        }))
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Get featured banners data', async () => {    
    
    await fetch('/featured-products')
        .then( res => {
            return res.json();
        })
        .then(data => {
            render(<Router><Grid products={data.products.results} isLoading={false} categories={ categoriesData.results }/></Router>);
        });

    await waitFor(() => {
        const testImgUrl = 'https://images.prismic.io/wizeline-academy/6b30b79d-12c6-4411-9808-2f629d141afe_1.webp?auto=compress,format';
        const productImage = screen.getByAltText('Tyler Poly Reclining Leather Armchair');
        expect(productImage.src).toEqual(testImgUrl);
        
        const productTitle = screen.getByText('Tyler Poly Reclining Leather Armchair');
        expect(productTitle).toBeInTheDocument();
    });
});