import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const storageListeners = new Map<string, Set<Function>>();
const memoryCache = new Map<string, any>(); // Добавляем кеш в память

export const storage = {
    get: async (key: string) => {
        // Сначала проверяем кеш
        if (memoryCache.has(key)) {
            return memoryCache.get(key);
        }

        const value = await AsyncStorage.getItem(key);
        const parsedValue = value ? JSON.parse(value) : null;

        // Сохраняем в кеш
        memoryCache.set(key, parsedValue);
        return parsedValue;
    },
    set: async (key: string, value: any) => {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        memoryCache.set(key, value); // Обновляем кеш

        const listeners = storageListeners.get(key);
        if (listeners) {
            listeners.forEach(listener => listener(value));
        }
    },
    remove: async (key: string) => {
        await AsyncStorage.removeItem(key);
        memoryCache.delete(key); // Удаляем из кеша

        const listeners = storageListeners.get(key);
        if (listeners) {
            listeners.forEach(listener => listener(null));
        }
    },
    subscribe: (key: string, callback: Function) => {
        if (!storageListeners.has(key)) {
            storageListeners.set(key, new Set());
        }
        storageListeners.get(key)!.add(callback);

        return () => {
            storageListeners.get(key)?.delete(callback);
        };
    }
}

const useStorage = <T = any>(key: string, initialValue: T | null = null) => {
    const [data, setData] = useState<T | null>(() => {
        // Проверяем кеш при инициализации
        return memoryCache.get(key) ?? initialValue;
    });
    const [loading, setLoading] = useState(!memoryCache.has(key)); // Если есть в кеше, не загружаем
    const [error, setError] = useState<string | null>(null);

    const handleStorageChange = useCallback((newValue: T | null) => {
        setData(newValue);
    }, []);

    const fetchStorageData = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await storage.get(key);
            setData(res);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const updateData = async (newValue: T) => {
        try {
            await storage.set(key, newValue);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save');
        }
    };

    const removeData = async () => {
        try {
            await storage.remove(key);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to remove');
        }
    };

    useEffect(() => {
        const unsubscribe = storage.subscribe(key, handleStorageChange);

        // Загружаем данные только если их нет в кеше
        if (!memoryCache.has(key)) {
            fetchStorageData();
        }

        return unsubscribe;
    }, [key, handleStorageChange]);

    return {
        data,
        loading,
        error,
        updateData,
        removeData,
        refetch: fetchStorageData
    };
};

export default useStorage;