import React, { useCallback, useState } from 'react';

type Options = {
    method?: string;
    body?: any;
    headers?: any;
};

export default function useFetch(url: string, options?: Options) {
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [succeeded, setSucceeded] = useState<boolean>(false);
    const [data, setData] = useState<any>();

    const get = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                setData(data);
                setSucceeded(true);
                return data;
            } else {
                setError(res);
                return null;
            }
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [url]);

    const post = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(url, options);
            if (res.ok) {
                const data = await res.json();
                setData(data);
                setSucceeded(true);
                return data;
            } else {
                setError(res);
                return null;
            }
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [options, url]);

    return { data, loading, error, succeeded, get, post };
}
