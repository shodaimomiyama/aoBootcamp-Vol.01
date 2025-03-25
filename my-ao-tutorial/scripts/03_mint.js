// scripts/03_mint.js
const Arweave = require("arweave")
const arweave = Arweave.init({ host: "localhost", port: 4000, protocol: "http" })

async function main() {
  // ウォレットを作成
  const jwk = await arweave.wallets.generate()
  const addr = await arweave.wallets.jwkToAddress(jwk)

  // 1) AR トークンをミント
  await arweave.api.get(`/mint/${addr}/1000000000000000`) // 1 AR = 1e12 winston, これは "1" AR 分をミント
  await arweave.api.get("/mine") // マイニング

  // 2) 残高を確認
  const balance = await arweave.wallets.getBalance(addr)
  console.log("Balance in Winston:", balance)
  console.log("Balance in AR:", arweave.ar.winstonToAr(balance))
}

main()
