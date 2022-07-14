import { cleanup, render, screen } from '@testing-library/react';
import Cards from './Cards';
import { PetContext } from '../Pets/Pets';
import filteredCats from '../../mocks/cats.js';

describe('Cards', () => {
    it('should render five card components', () => {
        render(
            <PetContext.Provider value={{ filteredCats, setCats: () => {} }}>
                <Cards />
            </PetContext.Provider>
        );

        const cardsElements = screen.getAllByRole('article');

        expect(cardsElements.length).toBe(5);

        cleanup();
    });
});
