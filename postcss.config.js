module.exports = (ctx) => ({
  "plugins": {
    "tailwindcss": {},
    "precss": {},
    "autoprefixer": {},
    "cssnano": ctx.env === 'production' ? {} : false
  }
})