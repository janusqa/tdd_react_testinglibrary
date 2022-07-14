import { useEffect, useState, useContext } from 'react';
import { produce } from 'immer';
import { PetContext } from '../Pets/Pets';
import './Card.css';
import heartFilled from './assets/heartFilled.svg';
import heartOutlined from './assets/heartOutlined.svg';

const Card = (props) => {
    const [isFavoured, setIsFavoured] = useState(props.favoured);
    const { setCats } = useContext(PetContext);

    const handleOnClick = (e) => {
        setIsFavoured((prevState) => {
            const nextState = produce(prevState, (draft) => {
                draft = !draft;
                return draft;
            });
            return nextState;
        });
    };

    useEffect(() => {
        setCats((prevState) => {
            const nextState = produce(prevState, (draft) => {
                const found = draft.findIndex((cat) => cat.id === props.id);
                if (found !== -1) {
                    draft[found].favoured = isFavoured;
                }
            });
            return nextState;
        });
    }, [isFavoured, setCats, props.id]);

    const jsx = (
        <article className="card">
            <figure className="card-header">
                <button className="heart" onClick={handleOnClick}>
                    <img
                        src={isFavoured ? heartFilled : heartOutlined}
                        alt={isFavoured ? 'filled heart' : 'outlined heart'}
                    />
                </button>
                <img
                    className="card-img"
                    src={props.image.url}
                    alt={props.image.alt}
                />
                <figcaption className="card-content">
                    <h3>{props.name}</h3>
                    <p>{props.phone}</p>
                    <p>{props.email}</p>
                </figcaption>
            </figure>
        </article>
    );
    return jsx;
};

export default Card;
