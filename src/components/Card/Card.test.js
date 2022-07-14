import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from './Card';
import { PetContext } from '../Pets/Pets';

describe('Card', () => {
    it('should display name of cat', () => {
        const props = {
            name: 'Sydney',
            phone: '111-111-1111',
            email: 'laith@hotmail.com',
            image: {
                url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                alt: 'Cute cat',
            },
            favoured: false,
        };
        render(
            <PetContext.Provider value={{ setCats: () => {} }}>
                <Card {...props} />
            </PetContext.Provider>
        );

        const nameOfCat = screen.getByRole('heading', {
            name: new RegExp(props.name, 'i'),
        });

        expect(nameOfCat).toBeInTheDocument();

        cleanup();
    });

    it('should display contact number of cat owner', () => {
        const props = {
            name: 'Sydney',
            phone: '111-111-1111',
            email: 'laith@hotmail.com',
            image: {
                url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                alt: 'Cute cat',
            },
            favoured: false,
        };
        render(
            <PetContext.Provider value={{ setCats: () => {} }}>
                <Card {...props} />
            </PetContext.Provider>
        );

        const ownerContactMobile = screen.getByText(
            new RegExp(props.phone, 'i')
        );

        expect(ownerContactMobile).toBeInTheDocument();

        cleanup();
    });

    it('should display contact email of cat owner', () => {
        const props = {
            name: 'Sydney',
            phone: '111-111-1111',
            email: 'laith@hotmail.com',
            image: {
                url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                alt: 'Cute cat',
            },
            favoured: false,
        };
        render(
            <PetContext.Provider value={{ setCats: () => {} }}>
                <Card {...props} />
            </PetContext.Provider>
        );

        const ownerContactEmail = screen.getByText(
            new RegExp(props.email, 'i')
        );

        expect(ownerContactEmail).toBeInTheDocument();

        cleanup();
    });

    it('should display image with correct src', () => {
        const props = {
            name: 'Sydney',
            phone: '111-111-1111',
            email: 'laith@hotmail.com',
            image: {
                url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                alt: 'Cute cat',
            },
            favoured: false,
        };
        render(
            <PetContext.Provider value={{ setCats: () => {} }}>
                <Card {...props} />
            </PetContext.Provider>
        );

        const catImage = screen.getByAltText(new RegExp(props.image.alt, 'i'));

        expect(catImage.src).toBe(props.image.url);

        cleanup();
    });

    it('should show outlined heart', () => {
        const props = {
            name: 'Sydney',
            phone: '111-111-1111',
            email: 'laith@hotmail.com',
            image: {
                url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                alt: 'Cute cat',
            },
            favoured: false,
        };

        const heart = {
            url: '',
            alt: 'outlined heart',
        };
        props.favoured = false;
        render(
            <PetContext.Provider value={{ setCats: () => {} }}>
                <Card {...props} />
            </PetContext.Provider>
        );

        const outlinedHeartElement = screen.getByAltText(
            new RegExp(heart.alt, 'i')
        );

        expect(outlinedHeartElement).toBeInTheDocument();

        cleanup();
    });

    it('should show filled heart', () => {
        const props = {
            name: 'Sydney',
            phone: '111-111-1111',
            email: 'laith@hotmail.com',
            image: {
                url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                alt: 'Cute cat',
            },
            favoured: false,
        };
        const heart = {
            url: '',
            alt: 'filled heart',
        };
        props.favoured = true;
        render(
            <PetContext.Provider value={{ setCats: () => {} }}>
                <Card {...props} />
            </PetContext.Provider>
        );

        const filledHeartElement = screen.getByAltText(
            new RegExp(heart.alt, 'i')
        );

        expect(filledHeartElement).toBeInTheDocument();

        cleanup();
    });

    it('should toggle heart status', () => {
        const props = {
            name: 'Sydney',
            phone: '111-111-1111',
            email: 'laith@hotmail.com',
            image: {
                url: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                alt: 'Cute cat',
            },
            favoured: false,
        };
        const outlinedHeart = {
            url: '',
            alt: 'outlined heart',
        };
        const filledHeart = {
            url: '',
            alt: 'filled heart',
        };
        props.favoured = false;
        render(
            <PetContext.Provider value={{ setCats: () => {} }}>
                <Card {...props} />
            </PetContext.Provider>
        );

        const heartButtonElement = screen.getByRole('button');

        let outlinedHeartElement;
        let filledHeartElement;

        outlinedHeartElement = screen.getByAltText(
            new RegExp(outlinedHeart.alt, 'i')
        );
        filledHeartElement = screen.queryByAltText(
            new RegExp(filledHeart.alt, 'i')
        );

        expect(outlinedHeartElement).toBeInTheDocument();
        expect(filledHeartElement).not.toBeInTheDocument();

        userEvent.click(heartButtonElement);
        outlinedHeartElement = screen.queryByAltText(
            new RegExp(outlinedHeart.alt, 'i')
        );
        filledHeartElement = screen.getByAltText(
            new RegExp(filledHeart.alt, 'i')
        );

        expect(outlinedHeartElement).not.toBeInTheDocument();
        expect(filledHeartElement).toBeInTheDocument();

        userEvent.click(heartButtonElement);
        outlinedHeartElement = screen.getByAltText(
            new RegExp(outlinedHeart.alt, 'i')
        );
        filledHeartElement = screen.queryByAltText(
            new RegExp(filledHeart.alt, 'i')
        );

        expect(outlinedHeartElement).toBeInTheDocument();
        expect(filledHeartElement).not.toBeInTheDocument();

        cleanup();
    });
});
