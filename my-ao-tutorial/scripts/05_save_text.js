// scripts/05_save_text.js
const Arweave = require("arweave")
const arweave = Arweave.init({ host: "localhost", port: 4000, protocol: "http" })

async function main() {
  // ウォレット作成 & ミント
  const jwk = await arweave.wallets.generate()
  const addr = await arweave.wallets.jwkToAddress(jwk)
  await arweave.api.get(`/mint/${addr}/1000000000000000`)
  await arweave.api.get("/mine")

  // データ保存用トランザクション
  const data = "# This is Markdown"
  let tx = await arweave.createTransaction({ data }, jwk)
  tx.addTag("Content-Type", "text/markdown")

  await arweave.transactions.sign(tx, jwk)
  await arweave.transactions.post(tx)
  await arweave.api.get("/mine")

  console.log("Markdown TxID:", tx.id)
}

main()
