import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
    const isLocalStorageAvailable = () => {
        try {
            const testKey = '__storage_test__';
            window.localStorage.setItem(testKey, testKey);
            window.localStorage.removeItem(testKey);
            return true;
        } catch {
            return false;
        }};
    const [storedValue, setStoredValue] = useState(() => {
        if (!isLocalStorageAvailable()) {
            console.warn('LocalStorage is not available. Using in-memory storage.');
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return initialValue;
        }});
    useEffect(() => {
        if (!isLocalStorageAvailable()) return;
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            if (error instanceof DOMException && 
                (error.code === 22 || error.code === 1014 || 
                 error.name === 'QuotaExceededError' || 
                 error.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
                console.warn('localStorage quota exceeded');
            }}
    }, [key, storedValue]);
    return [storedValue, setStoredValue];};
export default useLocalStorage;