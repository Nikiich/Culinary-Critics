export const FetchWithRetry = async (url, options, refreshAccessToken, accessToken, retryCount = 1) => {
  return await fetch(`http://localhost:3000/${url}`, options)
    .then(async (response) => {
      try {
        if(response.status === 403 && retryCount > 0){
        await refreshAccessToken();
        return FetchWithRetry(url, {...options, headers:{
          ...options.headers,
          'Authorization': `Bearer ${accessToken}`
        }}, 
        retryCount - 1);
      }}catch(err){
        console.log(err);
      }
      return response;
    }).catch(err => {
      throw err;
    });

}

export const FetchData = async (url, options) => {
  return await fetch(`http://localhost:3000/${url}`, options)
}
