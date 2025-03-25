const Arweave = require("arweave")

// ローカルArweaveノード(http://localhost:4000)へ接続
const arweave = Arweave.init({
  host: "localhost",
  port: 4000,
  protocol: "http",
})

console.log("Arweave initialized:", arweave)
