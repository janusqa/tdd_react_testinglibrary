import { useContext } from 'react';
import Card from '../Card/Card';
import './Cards.css';
import { PetContext } from '../Pets/Pets';

const Cards = () => {
    const { filteredCats: cats } = useContext(PetContext);
    const jsx = (
        <section className="pet-cards-container">
            {cats.map((cat) => (
                <Card key={cat.id} {...cat} />
            ))}
        </section>
    );
    return jsx;
};
export default Cards;
