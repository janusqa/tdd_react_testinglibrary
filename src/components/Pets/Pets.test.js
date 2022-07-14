import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Pets from './Pets';
import cats from '../../mocks/cats.js';

describe('Pets', () => {
    it('should display cards component with 5 card components', async () => {
        const server = setupServer(
            rest.get('http://localhost:4000/cats', (req, res, ctx) => {
                return res(ctx.status(200), ctx.json(cats));
            })
        );
        server.listen();
        // const fakeAxios = new MockAdapter(axios);
        // fakeAxios.onGet('/cats').reply(200, cats);

        render(<Pets />);
        const cardElements = await screen.findAllByRole('article');

        expect(cardElements.length).toBe(5);

        server.resetHandlers();
        server.close();
        cleanup();
    });

    it('should filter for all cats', async () => {
        const server = setupServer(
            rest.get('http://localhost:4000/cats', (req, res, ctx) => {
                return res(ctx.status(200), ctx.json(cats));
            })
        );
        server.listen();
        // const fakeAxios = new MockAdapter(axios);
        // fakeAxios.onGet('/cats').reply(200, cats);

        render(<Pets />);
        const cardElements = await screen.findAllByRole('article');

        expect(cardElements.length).toBe(5);

        const selectByGender = screen.getByLabelText(/gender/i);
        userEvent.selectOptions(selectByGender, 'any');

        const selectByFavoured = screen.getByLabelText(/favourite/i);
        userEvent.selectOptions(selectByFavoured, 'any');

        const filteredCards = screen.getAllByRole('article');

        expect(filteredCards).toStrictEqual(cardElements);

        server.resetHandlers();
        server.close();
        cleanup();
    });

    it('should filter for male cats', async () => {
        const server = setupServer(
            rest.get('http://localhost:4000/cats', (req, res, ctx) => {
                return res(ctx.status(200), ctx.json(cats));
            })
        );
        server.listen();
        // const fakeAxios = new MockAdapter(axios);
        // fakeAxios.onGet('/cats').reply(200, cats);

        render(<Pets />);
        const cardElements = await screen.findAllByRole('article');

        expect(cardElements.length).toBe(5);

        const select = screen.getByLabelText(/gender/i);
        userEvent.selectOptions(select, 'male');

        const filteredCards = screen.getAllByRole('article');

        expect(filteredCards).toStrictEqual([cardElements[1], cardElements[3]]);

        server.resetHandlers();
        server.close();
        cleanup();
    });

    it('should filter for female cats', async () => {
        const server = setupServer(
            rest.get('http://localhost:4000/cats', (req, res, ctx) => {
                return res(ctx.status(200), ctx.json(cats));
            })
        );
        server.listen();
        // const fakeAxios = new MockAdapter(axios);
        // fakeAxios.onGet('/cats').reply(200, cats);

        render(<Pets />);
        const cardElements = await screen.findAllByRole('article');

        expect(cardElements.length).toBe(5);

        const select = screen.getByLabelText(/gender/i);
        userEvent.selectOptions(select, 'female');

        const filteredCards = screen.getAllByRole('article');

        expect(filteredCards).toStrictEqual([
            cardElements[0],
            cardElements[2],
            cardElements[4],
        ]);

        server.resetHandlers();
        server.close();
        cleanup();
    });

    it('should filter for favored cats', async () => {
        const server = setupServer(
            rest.get('http://localhost:4000/cats', (req, res, ctx) => {
                return res(ctx.status(200), ctx.json(cats));
            })
        );
        server.listen();
        // const fakeAxios = new MockAdapter(axios);
        // fakeAxios.onGet('/cats').reply(200, cats);

        render(<Pets />);
        const cardElements = await screen.findAllByRole('article');

        expect(cardElements.length).toBe(5);

        const btn1stCard = within(cardElements[0]).getByRole('button');
        const btn4thCard = within(cardElements[3]).getByRole('button');
        userEvent.click(btn1stCard);
        userEvent.click(btn4thCard);

        const select = screen.getByLabelText(/favourite/i);
        userEvent.selectOptions(select, 'favoured');

        const filteredCards = screen.getAllByRole('article');

        expect(filteredCards).toStrictEqual([cardElements[0], cardElements[3]]);

        server.resetHandlers();
        server.close();
        cleanup();
    });

    it('should filter for not favored cats', async () => {
        const server = setupServer(
            rest.get('http://localhost:4000/cats', (req, res, ctx) => {
                return res(ctx.status(200), ctx.json(cats));
            })
        );
        server.listen();
        // const fakeAxios = new MockAdapter(axios);
        // fakeAxios.onGet('/cats').reply(200, cats);

        render(<Pets />);
        const cardElements = await screen.findAllByRole('article');

        expect(cardElements.length).toBe(5);

        const btn1stCard = within(cardElements[0]).getByRole('button');
        const btn4thCard = within(cardElements[3]).getByRole('button');
        userEvent.click(btn1stCard);
        userEvent.click(btn4thCard);

        const select = screen.getByLabelText(/favourite/i);
        userEvent.selectOptions(select, 'not favoured');

        const filteredCards = screen.getAllByRole('article');

        expect(filteredCards).toStrictEqual([
            cardElements[1],
            cardElements[2],
            cardElements[4],
        ]);

        server.resetHandlers();
        server.close();
        cleanup();
    });

    it('should filter for favored male cats', async () => {
        const server = setupServer(
            rest.get('http://localhost:4000/cats', (req, res, ctx) => {
                return res(ctx.status(200), ctx.json(cats));
            })
        );
        server.listen();
        // const fakeAxios = new MockAdapter(axios);
        // fakeAxios.onGet('/cats').reply(200, cats);

        render(<Pets />);
        const cardElements = await screen.findAllByRole('article');

        expect(cardElements.length).toBe(5);

        const btn1stCard = within(cardElements[0]).getByRole('button');
        const btn4thCard = within(cardElements[3]).getByRole('button');
        userEvent.click(btn1stCard);
        userEvent.click(btn4thCard);

        const selectFavoured = screen.getByLabelText(/favourite/i);
        const selectMale = screen.getByLabelText(/gender/i);
        userEvent.selectOptions(selectFavoured, 'favoured');
        userEvent.selectOptions(selectMale, 'male');

        const filteredCards = screen.getAllByRole('article');

        expect(filteredCards).toStrictEqual([cardElements[3]]);

        server.resetHandlers();
        server.close();
        cleanup();
    });
});
