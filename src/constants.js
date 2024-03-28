// Desc: Constants for the application
const dev = {
    BASEURL: 'http://localhost:8000',
}

const prod = {
    BASEURL: 'https://resume-ranking-backend.onrender.com',
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;