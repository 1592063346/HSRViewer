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
        }, {
            source: "/srasset/:path*",
            // destination: "https://images.mobilemeta.gg/starrail/static/:path*",
            // destination: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/:path*",
            // destination: "https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master/:path*",
            // destination: "https://gh.api.99988866.xyz/https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/:path*",
            destination: "https://hsrviewer-1319065297.cos.ap-beijing.myqcloud.com/:path*",
        }];
    }
};
module.exports = nextConfig;
