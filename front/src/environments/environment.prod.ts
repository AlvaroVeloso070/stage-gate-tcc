declare global {
    interface Window {
        env: {
            [key: string]: string;
        };
    }
}

export const environment = {
    production: true,
    server: window.env?.['SERVIDOR'] || 'http://localhost:8080'
};
