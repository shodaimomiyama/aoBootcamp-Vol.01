// scripts/04_transfer.js
const Arweave = require("arweave")
const arweave = Arweave.init({ host: "localhost", port: 4000, protocol: "http" })

async function main() {
  // 送信元ウォレット
  const jwkSender = await arweave.wallets.generate()
  const addrSender = await arweave.wallets.jwkToAddress(jwkSender)
  // 送信先ウォレット
  const jwkReceiver = await arweave.wallets.generate()
  const addrReceiver = await arweave.wallets.jwkToAddress(jwkReceiver)

  // 送信元に 1 AR をミント
  await arweave.api.get(`/mint/${addrSender}/1000000000000000`)
  await arweave.api.get("/mine")

  // 送金トランザクションを作成
  let tx = await arweave.createTransaction({
    target: addrReceiver,
    quantity: arweave.ar.arToWinston("0.5"),
  }, jwkSender)

  // 署名してアップロード
  await arweave.transactions.sign(tx, jwkSender)
  await arweave.transactions.post(tx)
  await arweave.api.get("/mine")

  console.log("Transfer TxID:", tx.id)
}

main()
