// scripts/06_save_svg.js
const Arweave = require("arweave")
const arweave = Arweave.init({ host: "localhost", port: 4000, protocol: "http" })

const AO_LOGO_BASE64 = "PHN2ZyB3aWR0aD0iNDI5IiBoZWlnaHQ9IjIxNCIgdmlld0JveD0iMCAwIDQyOSAyMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0wIDIxNEg3MS4zNzYzTDg1Ljk0MjkgMTc0LjYxTDUzLjE2ODEgMTA3LjVMMCAyMTRaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMTg5LjM2NiAxNjAuNzVMMTA5Ljk3OCAxTDg1Ljk0MjkgNTUuNzA4OUwxNjAuOTYxIDIxNEgyMTVMMTg5LjM2NiAxNjAuNzVaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMyMiAyMTRDMzgxLjA5NCAyMTQgNDI5IDE2Ni4wOTQgNDI5IDEwN0M0MjkgNDcuOTA1NSAzODEuMDk0IDAgMzIyIDBDMjYyLjkwNiAwIDIxNSA0Ny45MDU1IDIxNSAxMDdDMjE1IDE2Ni4wOTQgMjYyLjkwNiAyMTQgMzIyIDIxNFpNMzIyIDE3MkMzNTcuODk5IDE3MiAzODcgMTQyLjg5OSAzODcgMTA3QzM4NyA3MS4xMDE1IDM1Ny44OTkgNDIgMzIyIDQyQzI4Ni4xMDEgNDIgMjU3IDcxLjEwMTUgMjU3IDEwN0MyNTcgMTQyLjg5OSAyODYuMTAxIDE3MiAzMjIgMTcyWiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg=="

async function main() {
  const jwk = await arweave.wallets.generate()
  const addr = await arweave.wallets.jwkToAddress(jwk)

  // ミント & マイニング
  await arweave.api.get(`/mint/${addr}/1000000000000000`)
  await arweave.api.get("/mine")

  // SVG 画像を Base64 でエンコード済みデータとして保存
  const data = Buffer.from(AO_LOGO_BASE64, "base64")
  let tx = await arweave.createTransaction({ data }, jwk)
  tx.addTag("Content-Type", "image/svg+xml")

  await arweave.transactions.sign(tx, jwk)
  await arweave.transactions.post(tx)
  await arweave.api.get("/mine")

  console.log("SVG TxID:", tx.id)
}

main()
