export const authorize = (res, next) => {
  if (window !== "undefined") {
    //เก็บข้อมูลลง session storage
      const token = JSON.stringify(res.data.token);
      const username = JSON.stringify(res.data.username);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", username);
      next();
  }
}

export const getToken=(res)=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false;
        }
    }
}
export const getUser=(res)=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("username")){
            return JSON.parse(sessionStorage.getItem("username"))
        }else{
            return false;
        }
    }
}

export const logout = (next) =>{
    if(window !== "undefined"){
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("token")
        next()
    }
}