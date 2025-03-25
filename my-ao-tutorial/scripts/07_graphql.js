// scripts/07_graphql.js
const fetch = require("node-fetch")

async function main(txid) {
  const query = `
    query {
      transactions(ids: ["${txid}"]) {
        edges {
          node {
            id
            owner { address }
            tags {
              name
              value
            }
          }
        }
      }
    }
  `
  const res = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  }).then(r => r.json())

  console.log(JSON.stringify(res, null, 2))
}

main('nCG7hmqFdWi9MIXrL3r9Xh-VHYK2AyNgAtVNMUp1co8')
