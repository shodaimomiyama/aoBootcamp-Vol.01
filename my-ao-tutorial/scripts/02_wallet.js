// scripts/02_wallet.js
const Arweave = require("arweave")

const arweave = Arweave.init({ host: "localhost", port: 4000, protocol: "http" })

async function main() {
  // ウォレットを生成
  const jwk = await arweave.wallets.generate()
  const addr = await arweave.wallets.jwkToAddress(jwk)

  console.log("ウォレットアドレス:", addr)
  console.log("JWK:", jwk)
}

main()
