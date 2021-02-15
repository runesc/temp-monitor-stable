/*

    Aqui se guardan alias y estos sirven para reducir las largas rutas de nuestro proyecto
*/

const path = require("path");
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, "src"),
    }
  }
}