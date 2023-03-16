module.exports = {
  css: {
    loaderOptions: {
      scss: {
//if not working, try with "additionalData" instead of "prependData"
        additionalData: `
            @import "@/assets/scss/variables.scss";
          `,
      },
    },
  },
};