export default async function handler(req, res) { 
  if (req.body == null || req.body == "undefined" )
    {
      res.status(201);
    }
    const reqBody = JSON.parse(req.body)
    console.log(reqBody);
    const body = JSON.stringify({
      "operation": "update",
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
    const result = await fetch(url, requestOptions).then(r => r.json());
    res.status(200).json({ 
      result
    }) 
}