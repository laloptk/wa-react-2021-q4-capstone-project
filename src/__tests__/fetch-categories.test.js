import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Carousel from '../components/Carousel';
import categoriesData from '../../public/product-categories.json';

const server = setupServer( 
    rest.get('/featured-categories', (req, res, context) => {
        return res(context.json({
            categories: categoriesData
        }))
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Get featured categories data', async () => {    
    
    
    await waitFor(() => {
        const testImgUrl = 'https://images.prismic.io/wizeline-academy/5df875b5-3e43-4cf0-97b9-06ed73ed6d9b_sanibell-bv-530lZQXMKGw-unsplash-web+%281%29.jpg?auto=compress,format&rect=0,24,1920,1231&w=621&h=398';
        const catImage = screen.getAllByAltText('Bath');
        expect(catImage[0].src).toEqual(testImgUrl);
        
        const catTitle = screen.getAllByText('Bed & Bath');
        expect(catTitle[0]).toBeInTheDocument();
    });
});