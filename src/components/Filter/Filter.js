import { produce } from 'immer';
import { useContext } from 'react';
import { PetContext } from '../Pets/Pets';
import './Filter.css';

const Filter = () => {
    const { filters, setFilters } = useContext(PetContext);
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevState) => {
            const nextState = produce(prevState, (draft) => {
                draft[name] = value;
            });
            return nextState;
        });
    };
    const jsx = (
        <aside className="pet-filter-container">
            <div className="filter-container">
                <label htmlFor="favourite">Favourite</label>
                <select
                    className="form-select"
                    id="favourite"
                    name="favourite"
                    value={filters.favourite}
                    onChange={handleOnChange}
                >
                    <option value="any">Any</option>
                    <option value="favoured">Favoured</option>
                    <option value="not favoured">Not Favoured</option>
                </select>
            </div>
            <div className="filter-container">
                <label htmlFor="gender">Gender</label>
                <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={filters.gender}
                    onChange={handleOnChange}
                >
                    <option value="any">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
        </aside>
    );
    return jsx;
};
export default Filter;
