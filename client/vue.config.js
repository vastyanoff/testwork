module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:15500",
                secure: false
            },
            "/uploads": {
                target: "http://localhost:15500",
                secure: false
            }
        }
    }
};