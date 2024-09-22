/** @type {import("next").NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false
    },
    output: "export",
};

module.exports = nextConfig;
