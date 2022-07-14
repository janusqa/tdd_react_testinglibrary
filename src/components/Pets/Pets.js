import { useEffect, useState, createContext } from 'react';
import { produce } from 'immer';
import useCatsApi from '../../api/fetch';
import Cards from '../Cards/Cards';
import Filter from '../Filter/Filter';
import './Pets.css';

export const PetContext = createContext();

const Pets = () => {
    const [filters, setFilters] = useState({ gender: 'any', favourite: 'any' });
    const [cats, setCats] = useState([]);
    const [filteredCats, setFilteredCats] = useState([]);
    const { data, loading } = useCatsApi('/cats');

    useEffect(() => {
        if (data) {
            setCats((prevState) => {
                const nextState = produce(prevState, (draft) => {
                    draft = data;
                    return draft;
                });
                return nextState;
            });
        }
    }, [data]);

    useEffect(() => {
        setFilteredCats((prevState) => {
            const nextState = produce(prevState, (draft) => {
                draft = cats.filter(
                    (cat) =>
                        (filters.favourite === 'any'
                            ? true
                            : filters.favourite === 'favoured'
                            ? cat.favoured
                            : !cat.favoured) &&
                        (filters.gender === 'any'
                            ? true
                            : cat.gender === filters.gender)
                );
                return draft;
            });
            return nextState;
        });
    }, [filters, filters.gender, filters.favourite, cats]);

    const jsx = (
        <PetContext.Provider
            value={{
                filters,
                setFilters,
                filteredCats,
                setCats,
            }}
        >
            <main className="app-container">
                <Filter />
                {loading ? <div>LOADING...</div> : <Cards />}
            </main>
        </PetContext.Provider>
    );
    return jsx;
};

export default Pets;
