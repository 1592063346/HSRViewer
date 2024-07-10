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
            // destination: "https://hsrviewer-1319065297.cos.ap-beijing.myqcloud.com/:path*",
            // destination: "https://cloud.tsinghua.edu.cn/published/starrailres/:path*",
            destination: "https://imagine076.oss-cn-beijing.aliyuncs.com/:path*"
        }, {
            source: "/srasset/:path*",
            // destination: "https://images.mobilemeta.gg/starrail/static/:path*",
            // destination: "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/:path*",
            // destination: "https://cdn.jsdelivr.net/gh/Mar-7th/StarRailRes@master/:path*",
            // destination: "https://gh.api.99988866.xyz/https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/:path*",
            // destination: "https://hsrviewer-1319065297.cos.ap-beijing.myqcloud.com/:path*",
            // destination: "https://cloud.tsinghua.edu.cn/published/starrailres/:path*",
            destination: "https://imagine076.oss-cn-beijing.aliyuncs.com/:path*"
        }, {
            source: "/icon/:path*",
            // destination: "https://cloud.tsinghua.edu.cn/published/starrailres/icon/:path*",
            destination: "https://imagine076.oss-cn-beijing.aliyuncs.com/icon/:path*"
        }, {
            source: "/image/:path*",
            // destination: "https://cloud.tsinghua.edu.cn/published/starrailres/image/:path*",
            destination: "https://imagine076.oss-cn-beijing.aliyuncs.com/image/:path*"
        }];
    }
};
module.exports = nextConfig;
