/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fakestoreapi.com',
                port: '',
                pathname: '/img/**', 
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/u/**', 
            },
            {
                protocol: 'https',
                hostname: 'cdn.dummyjson.com',
                port: '',
                pathname: '/product-images/**',
            },
            
        ]
    }
}

module.exports = nextConfig
//         "https://cdn.dummyjson.com/product-images/1/1.jpg"
