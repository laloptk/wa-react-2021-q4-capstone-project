import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Home from '../components/Home';
import bannersData from '../../public/featured-banners.json';

const server = setupServer(
    rest.get('/featured-banners', (req, res, context) => {
        return res(context.json({
            banners: bannersData
        }))
    })    
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const getApiData = async () => {
    await fetch(
        '/featured-banners',
        {
          signal: controller.signal,
        }
    )
}

global.fetch = 

console.log(getApiData());

/*test('Get featured banners data', async () => {    

    await waitFor(() => {
        const testImgUrl = 'https://images.prismic.io/wizeline-academy/edaf28da-2e46-4f75-8a69-a972119f40ed_banner-3-2.jpeg?auto=compress,format&rect=0,0,1429,700&w=1440&h=705';
        const bannerImage = screen.getAllByAltText('AMAZING FINISHES - BEDROOM');
        expect(bannerImage[0].src).toEqual(testImgUrl);
        
        const bannerTitle = screen.getAllByText('AMAZING FINISHES - BEDROOM');
        expect(bannerTitle[0]).toBeInTheDocument();
    });
});*/