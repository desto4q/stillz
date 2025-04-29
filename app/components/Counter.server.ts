
let get_data = async ()=>{

  let resp = new Promise((resolve)=>setTimeout(resolve,2000))
  console.log()
  return Response.json({hello:"world"})
}
