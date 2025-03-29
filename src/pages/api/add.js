export default async function handler(req, res) {
  if (req.body == null || req.body == "undefined" )
  {
    res.status(201);
  }
  const reqBody = JSON.parse(req.body)
  const body = JSON.stringify({
    "operation": "insert",
    "schema": "products",
    "table": "skus",
    "records":[reqBody]
  })
  const requestOptions = { 
    method: 'POST', 
    headers: { 
      'content-type': 'application/json',
      'Authorization': `Basic ${btoa(process.env.HARPER_API_USER + ":" + process.env.HARPER_API_PS)}`
    }, 
    body: body
  }; 
  const url = `${process.env.HARPER_FUNCTIONS_URL}`; 
  const results = await fetch(url, requestOptions);
  if(results.status == 200)
  {
    res.status(201).json({ 
      data:{
        id: reqBody.product_id
      }
    }) 
  }
}