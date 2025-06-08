import { useState, useEffect } from 'react';
import type { Skip } from '../types';


const API_URL = 'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft';

interface UseSkipsResult {
    skips: Skip[];
    isLoading: boolean;
    error: string | null;
}

export function useSkips(): UseSkipsResult {
    const [skips, setSkips] = useState<Skip[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSkips = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Skip[] = await response.json();
                const sortedData = [...data].sort((a, b) => a.size - b.size);
                setSkips(sortedData);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError("An unknown error occurred.");
                }
                console.error("Failed to fetch skips:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSkips();
    }, []);

    return { skips, isLoading, error };
}