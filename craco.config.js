const plugin = require("@tailwindcss/forms");

module.exports = {
    style: {
        postcss: {
            plugin: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
}