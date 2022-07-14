import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PetContext } from '../Pets/Pets';

import Filter from './Filter';

describe('Filter', () => {
    it('should be able to change value of favourite select', () => {
        const { rerender } = render(
            <PetContext.Provider
                value={{
                    filters: { favourite: 'any', gender: 'any' },
                    setFilters: () => {},
                }}
            >
                <Filter />
            </PetContext.Provider>
        );
        const select = screen.getByLabelText(/favourite/i);

        expect(select.value).toBe('any');

        userEvent.selectOptions(select, 'favoured');
        rerender(
            <PetContext.Provider
                value={{
                    filters: { favourite: 'favoured', gender: 'any' },
                    setFilters: () => {},
                }}
            >
                <Filter />
            </PetContext.Provider>
        );
        expect(select.value).toBe('favoured');

        userEvent.selectOptions(select, 'not favoured');
        rerender(
            <PetContext.Provider
                value={{
                    filters: { favourite: 'not favoured', gender: 'any' },
                    setFilters: () => {},
                }}
            >
                <Filter />
            </PetContext.Provider>
        );
        expect(select.value).toBe('not favoured');

        cleanup();
    });

    it('should be able to change value of gender select', () => {
        const { rerender } = render(
            <PetContext.Provider
                value={{
                    filters: { favourite: 'any', gender: 'any' },
                    setFilters: () => {},
                }}
            >
                <Filter />
            </PetContext.Provider>
        );
        const select = screen.getByLabelText(/gender/i);

        expect(select.value).toBe('any');

        userEvent.selectOptions(select, 'male');
        rerender(
            <PetContext.Provider
                value={{
                    filters: { favourite: 'any', gender: 'male' },
                    setFilters: () => {},
                }}
            >
                <Filter />
            </PetContext.Provider>
        );
        expect(select.value).toBe('male');

        userEvent.selectOptions(select, 'female');
        rerender(
            <PetContext.Provider
                value={{
                    filters: { favourite: 'any', gender: 'female' },
                    setFilters: () => {},
                }}
            >
                <Filter />
            </PetContext.Provider>
        );
        expect(select.value).toBe('female');

        cleanup();
    });
});
