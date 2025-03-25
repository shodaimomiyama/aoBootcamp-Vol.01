// scripts/08_get_data.js
const Arweave = require("arweave")
const arweave = Arweave.init({ host: "localhost", port: 4000, protocol: "http" })

async function main(txid) {
  // 1) arweave.js の getData で取得
  const data1 = await arweave.transactions.getData(txid, {
    decode: true,
    string: true,
  })
  console.log("arweave.getData() =>", data1)

  // 2) HTTP リクエストで取得
  const data2 = await fetch(`http://localhost:4000/${txid}`).then(r => r.text())
  console.log("fetch HTTP =>", data2)
}

main('nCG7hmqFdWi9MIXrL3r9Xh-VHYK2AyNgAtVNMUp1co8')
