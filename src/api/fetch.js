import { useEffect, useState, useCallback } from 'react';
import { produce } from 'immer';
import axios from 'axios';

const useCatsApi = (url, method = 'get', postData = null) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ payload: null });

    const getData = useCallback(async () => {
        try {
            const response = await axios({
                baseURL: 'http://localhost:4000',
                url: url,
                method: method,
                data: postData,
            });
            setData((prevState) => {
                const nextState = produce(prevState, (draft) => {
                    draft.payload = response.data;
                });
                return nextState;
            });
            setLoading((prevState) => {
                const nextState = produce(prevState, (draft) => {
                    draft = false;
                    return draft;
                });
                return nextState;
            });
        } catch (error) {
            setLoading((prevState) => {
                const nextState = produce(prevState, (draft) => {
                    draft = false;
                    return draft;
                });
                return nextState;
            });
        }
    }, [url, method, postData]);

    useEffect(() => {
        getData();
    }, [url, getData]);

    return { loading: loading, data: data.payload };
};

export default useCatsApi;
