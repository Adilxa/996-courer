import { storage } from "@/shared/util/storage";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

export const BASE_URL = "https://api996.syntlex.kg/api";

interface User {
    token: string;
    refreshToken: string;
    tokenExpiry?: number;
}

interface RefreshTokenResponse {
    token: string;
    refreshToken: string;
}

const $api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Флаг для предотвращения множественных запросов на обновление токена
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });

    failedQueue = [];
};

const getUser = async (): Promise<User | null> => {
    try {
        const userString = await storage.get('user');
        if (!userString) return null;
        return JSON.parse(userString);
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
};

const saveUser = async (user: User): Promise<void> => {
    try {
        await storage.set('user', JSON.stringify(user));
    } catch (error) {
        console.error('Error saving user:', error);
    }
};

const getToken = async (): Promise<string | null> => {
    const user = await getUser();
    return user?.token || null;
};

const isTokenExpired = (tokenExpiry?: number): boolean => {
    if (!tokenExpiry) return false;
    return Date.now() >= (tokenExpiry - 5 * 60 * 1000);
};

const refreshToken = async (): Promise<string | null> => {
    try {
        const user = await getUser();
        if (!user?.refreshToken) {
            throw new Error('No refresh token available');
        }

        const response: AxiosResponse<RefreshTokenResponse> = await axios.post(
            `${BASE_URL}/refresh/token`,
            { refreshToken: user.refreshToken },
            {
                headers: {
                    'Accept-Language': 'kg-KY',
                    'Content-Type': 'application/json'
                }
            }
        );

        const { token: newToken, refreshToken: newRefreshToken } = response.data;

        const tokenExpiry = Date.now() + (2 * 60 * 60 * 1000);

        const updatedUser: User = {
            ...user,
            token: newToken,
            refreshToken: newRefreshToken,
            tokenExpiry
        };

        await saveUser(updatedUser);

        console.log('Token refreshed successfully');
        return newToken;
    } catch (error) {
        console.error('Error refreshing token:', error);
        await storage.remove('user');
        throw error;
    }
};

export const initializeTokenExpiry = async (token: string, refreshToken: string): Promise<void> => {
    const tokenExpiry = Date.now() + (2 * 60 * 60 * 1000);
    const user: User = {
        token,
        refreshToken,
        tokenExpiry
    };
    await saveUser(user);
};

$api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        try {
            const user = await getUser();

            if (user) {
                if (isTokenExpired(user.tokenExpiry)) {
                    if (isRefreshing) {
                        return new Promise((resolve, reject) => {
                            failedQueue.push({ resolve, reject });
                        }).then((token) => {
                            if (config.headers) {
                                config.headers.Authorization = `Bearer ${token}`;
                            }
                            return config;
                        });
                    }

                    isRefreshing = true;

                    try {
                        const newToken = await refreshToken();
                        processQueue(null, newToken);

                        if (config.headers && newToken) {
                            config.headers.Authorization = `Bearer ${newToken}`;
                        }
                    } catch (refreshError) {
                        processQueue(refreshError, null);
                        throw refreshError;
                    } finally {
                        isRefreshing = false;
                    }
                } else if (config.headers) {
                    config.headers.Authorization = `Bearer ${user.token}`;
                }
            }

            return config;
        } catch (error) {
            console.error('Error in request interceptor:', error);
            return config;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: () => resolve($api(originalRequest)),
                        reject
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newToken = await refreshToken();
                processQueue(null, newToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                }

                return $api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export const startTokenRefreshInterval = () => {
    const refreshInterval = 115 * 60 * 1000;

    return setInterval(async () => {
        try {
            const user = await getUser();
            if (user && user.token) {
                console.log('Automatic token refresh...');
                await refreshToken();
            }
        } catch (error) {
            console.error('Automatic token refresh failed:', error);
        }
    }, refreshInterval);
};

export const stopTokenRefreshInterval = (intervalId: NodeJS.Timeout) => {
    clearInterval(intervalId);
};

export const logout = async (): Promise<void> => {
    try {
        await storage.remove('user');
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

export default $api;




// import { storage } from "@/shared/util/storage";
// import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// export const BASE_URL = "https://api996.syntlex.kg/api";

// interface User {
//     token: string;
//     refreshToken: string;
//     tokenExpiry?: number;
// }

// interface RefreshTokenResponse {
//     token: string;
//     refreshToken: string;
// }

// const $api = axios.create({
//     baseURL: BASE_URL,
//     withCredentials: true,
// });

// // Флаг для предотвращения множественных запросов на обновление токена
// let isRefreshing = false;
// let failedQueue: Array<{
//     resolve: (value?: any) => void;
//     reject: (reason?: any) => void;
// }> = [];

// const processQueue = (error: any, token: string | null = null) => {
//     failedQueue.forEach(({ resolve, reject }) => {
//         if (error) {
//             reject(error);
//         } else {
//             resolve(token);
//         }
//     });
    
//     failedQueue = [];
// };

// const getUser = async (): Promise<User | null> => {
//     try {
//         const userString = await storage.get('user');
//         if (!userString) return null;
//         return JSON.parse(userString);
//     } catch (error) {
//         console.error('Error getting user:', error);
//         return null;
//     }
// };

// const saveUser = async (user: User): Promise<void> => {
//     try {
//         await storage.set('user', JSON.stringify(user));
//     } catch (error) {
//         console.error('Error saving user:', error);
//     }
// };

// const getToken = async (): Promise<string | null> => {
//     const user = await getUser();
//     return user?.token || null;
// };

// const isTokenExpired = (tokenExpiry?: number): boolean => {
//     if (!tokenExpiry) return false;
//     // Проверяем, истекает ли токен в течение следующих 5 минут
//     return Date.now() >= (tokenExpiry - 5 * 60 * 1000);
// };

// const refreshToken = async (): Promise<string | null> => {
//     try {
//         const user = await getUser();
//         if (!user?.refreshToken) {
//             throw new Error('No refresh token available');
//         }

//         const response: AxiosResponse<RefreshTokenResponse> = await axios.post(
//             `${BASE_URL}/refresh/token`,
//             { refreshToken: user.refreshToken },
//             {
//                 headers: {
//                     'Accept-Language': 'kg-KY',
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );

//         const { token: newToken, refreshToken: newRefreshToken } = response.data;
        
//         // Устанавливаем время истечения токена (2 часа от текущего момента)
//         const tokenExpiry = Date.now() + (2 * 60 * 60 * 1000);

//         const updatedUser: User = {
//             ...user,
//             token: newToken,
//             refreshToken: newRefreshToken,
//             tokenExpiry
//         };

//         await saveUser(updatedUser);
        
//         console.log('Token refreshed successfully');
//         return newToken;
//     } catch (error) {
//         console.error('Error refreshing token:', error);
//         // Если обновление токена не удалось, очищаем пользовательские данные
//         await storage.remove('user');
//         throw error;
//     }
// };

// // Функция для инициализации времени истечения токена при первом входе
// export const initializeTokenExpiry = async (token: string, refreshToken: string): Promise<void> => {
//     const tokenExpiry = Date.now() + (2 * 60 * 60 * 1000); // 2 часа
//     const user: User = {
//         token,
//         refreshToken,
//         tokenExpiry
//     };
//     await saveUser(user);
// };

// // Interceptor для добавления токена к запросам
// $api.interceptors.request.use(
//     async (config: InternalAxiosRequestConfig) => {
//         try {
//             const user = await getUser();
            
//             if (user) {
//                 // Проверяем, нужно ли обновить токен
//                 if (isTokenExpired(user.tokenExpiry)) {
//                     if (isRefreshing) {
//                         // Если токен уже обновляется, ждем завершения
//                         return new Promise((resolve, reject) => {
//                             failedQueue.push({ resolve, reject });
//                         }).then((token) => {
//                             if (config.headers) {
//                                 config.headers.Authorization = `Bearer ${token}`;
//                             }
//                             return config;
//                         });
//                     }

//                     isRefreshing = true;
                    
//                     try {
//                         const newToken = await refreshToken();
//                         processQueue(null, newToken);
                        
//                         if (config.headers && newToken) {
//                             config.headers.Authorization = `Bearer ${newToken}`;
//                         }
//                     } catch (refreshError) {
//                         processQueue(refreshError, null);
//                         throw refreshError;
//                     } finally {
//                         isRefreshing = false;
//                     }
//                 } else if (config.headers) {
//                     config.headers.Authorization = `Bearer ${user.token}`;
//                 }
//             }

//             return config;
//         } catch (error) {
//             console.error('Error in request interceptor:', error);
//             return config;
//         }
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Interceptor для обработки ответов и автоматического обновления токена при 401 ошибке
// $api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
        
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({ 
//                         resolve: () => resolve($api(originalRequest)), 
//                         reject 
//                     });
//                 });
//             }

//             originalRequest._retry = true;
//             isRefreshing = true;

//             try {
//                 const newToken = await refreshToken();
//                 processQueue(null, newToken);
                
//                 if (originalRequest.headers) {
//                     originalRequest.headers.Authorization = `Bearer ${newToken}`;
//                 }
                
//                 return $api(originalRequest);
//             } catch (refreshError) {
//                 processQueue(refreshError, null);
//                 // Перенаправляем на страницу входа или показываем уведомление
//                 // window.location.href = '/login';
//                 return Promise.reject(refreshError);
//             } finally {
//                 isRefreshing = false;
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// // Функция для автоматического обновления токена каждые 2 часа
// export const startTokenRefreshInterval = () => {
//     // Обновляем токен каждые 1 час 55 минут (чуть раньше истечения)
//     const refreshInterval = 115 * 60 * 1000; // 1 час 55 минут в миллисекундах
    
//     return setInterval(async () => {
//         try {
//             const user = await getUser();
//             if (user && user.token) {
//                 console.log('Automatic token refresh...');
//                 await refreshToken();
//             }
//         } catch (error) {
//             console.error('Automatic token refresh failed:', error);
//         }
//     }, refreshInterval);
// };

// // Функция для остановки автоматического обновления токена
// export const stopTokenRefreshInterval = (intervalId: NodeJS.Timeout) => {
//     clearInterval(intervalId);
// };

// // Функция для logout
// export const logout = async (): Promise<void> => {
//     try {
//         await storage.remove('user');
//     } catch (error) {
//         console.error('Error during logout:', error);
//     }
// };

// export default $api;