const API_BASE_URL='https://api-pdp.thepeoplepulse.org'
const apiService={
  get:async(endpoint)=>{
    const url=`${API_BASE_URL}/${endpoint}`
    const response=await fetch(url).then((response)=>response.json())
    return response
  },
  post: async (endpoint, data) => {
    const url ="https://api-pdp.thepeoplepulse.org/validates-login"

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
           
        },
        body: JSON.stringify(data)
    }).then((response) => response.json());
    console.log(response,'resmmmn')
   
    return response;
}

  
}

export default apiService