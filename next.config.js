/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, /* @note: To prevent duplicated call of useEffect */
    swcMinify: true,

    async rewrites() {
        return [{
            source: "/api/:path*",
            destination: "https://api.mihomo.me/sr_info_parsed/:path*",
        }, {
            source: "/asset/:path*",
            destination: "https://hsrviewer-1319065297.cos.ap-beijing.myqcloud.com/:path*",
        }];
    }
};
module.exports = nextConfig;
