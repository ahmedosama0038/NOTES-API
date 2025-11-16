



const usermail =document.getElementById("usermall")
const userbass =document.getElementById("password")
const formLogin =document.getElementById("formLogin")
const userbtn =document.getElementById("userbtn")



formLogin.addEventListener("submit"  , async  function(e){
 e.preventDefault()

let userData ={

  email:usermail.value,
  password:userbass.value,
}
 
try {

    
let res = await fetch(`https://note-sigma-black.vercel.app/api/v1/users/signIn` ,{
    method : "POST",
    body : JSON.stringify(userData),
    headers: {
    "Content-Type" : "application/json"
    }

})
 
let data = await res.json()
console.log(data);

if (data.msg ==="done" ) {


     localStorage.setItem( "userToken" , data.token)
     window.location.href = '../logine/home/home.html';
}
else{
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: `${data.msg}`,
});
}


    
} catch ( error) {

    console.log(`erroo:`, error);
    
    
}


})



