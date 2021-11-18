import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Sidebar from '../components/Sidebar';
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
    const filters = [];

    const setFilters = (id) => {
        const filterExists = filters.indexOf(id);
        if(filterExists === -1) {
            filters.push(id);
        } else {
            filters.splice(filterExists, 1);
        }
    }
    
    await fetch('/featured-categories')
        .then( res => {
            return res.json();
        })
        .then(data => {
            render(<Router><Sidebar categories={data.categories.results} setCategoriesFilters={setFilters} activeFilters={[ 'YWHx-xIAAC0Ayj7i' ]} /></Router>);
        });
    

    await waitFor(() => {        
        const catTitle = screen.getByText('Bed & Bath');
        expect(catTitle).toBeInTheDocument();
        fireEvent.click(screen.getByText('Bed & Bath'));
        console.log(filters);
        expect(catTitle.classList.contains('active')).toBeTruthy();

        
    });
});