


const username =document.getElementById("username")
const usermail =document.getElementById("usermall")
const userbass =document.getElementById("password")
const userage =document.getElementById("userage")
const userphone =document.getElementById("userphone")
const fromregister =document.getElementById("formReigster")
const userbtn =document.getElementById("userbtn")



fromregister.addEventListener("submit"  , async  function(e){
 e.preventDefault()

let userData ={
  name: username.value,
  email:usermail.value,
  password:userbass.value,
  age:userage.value,
  phone:userphone.value,



}
 
try {

    
let res = await fetch(`https://note-sigma-black.vercel.app/api/v1/users/signUp` ,{
    method : "POST",
    body : JSON.stringify(userData),
    headers: {
    "Content-Type" : "application/json"
    }

})
 
let data = await res.json()
console.log(data);

if (data.msg ==="done" ) {

    
    window.location.href = './badgs/logine/login.html';
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

