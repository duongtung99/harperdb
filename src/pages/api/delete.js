export default async function handler(req, res) { 
  const { product_id } = JSON.parse(req.body); 
  const body = JSON.stringify({
    "operation": "delete",
    "schema": "products",
    "table": "skus",
    "hash_values": [
      product_id
    ]
  })
  console.log(body)
  const requestOptions = { 
    method: 'POST', 
    headers: { 
      'content-type': 'application/json',
      'Authorization': `Basic ${btoa(process.env.HARPER_API_USER + ":" + process.env.HARPER_API_PS)}`
    }, 
    body: body
  }; 
  const url = `${process.env.HARPER_FUNCTIONS_URL}`; 
  const result = await fetch(url, requestOptions).then(r => r.json()); 
  res.status(200).json({ 
    result
  }) 
}