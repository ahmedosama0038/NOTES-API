
const addNote =document.getElementById("addNote");
const updetNote =document.getElementById("updetNote");
const noteContent =document.getElementById("noteContent");
const noteTitel =document.getElementById("noteTitel");
const rowData =document.getElementById("rowData");
const logout =document.getElementById("Logout");

 let cuurntid;





logout.addEventListener("click" ,  function(e){
e.preventDefault()

window.location.href= "../../logine/login.html"

})



    let nodlist=[]

    getuserdate()
addNote.addEventListener("click" ,async  function(e){
 e.preventDefault()
addNotes()
  

})


 async function addNotes(){


 let usertoken ={
    title:noteTitel.value ,
    content: noteContent.value,
}

try {

    
  let res  = await fetch(`https://note-sigma-black.vercel.app/api/v1/notes` ,{
    method:"POST",
    body :JSON.stringify(usertoken) ,
     headers: {
    "Content-Type" : "application/json",
    token:`3b8ny__${localStorage.getItem("userToken")}` ,
    },
    

 })

let data =  await res.json()

if (data.msg === "done" && res.status==201) {

    Swal.fire({
  title: "Good job!",
  text: `${data.msg}`,
  icon: "success"
});
   


 getuserdate()


} else {

    
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: `${data.msg}`,
});
}

    
} catch (error) {

    console.log("error :" , error);
    
    
}


}

 
 async function getuserdate(){

    let res = await fetch(`https://note-sigma-black.vercel.app/api/v1/notes`, {
        headers:{
            token:`3b8ny__${localStorage.getItem("userToken")}` ,
        }
    })
let data = await res.json()

nodlist = data.notes

if (res.status>=200  &&  res.status<400) {
    disblydata()
}else{

rowData.innerHTML=`

<p class="alert alert-danger  text-center p-3 fs-3 fw-bold"><i class="fa-solid fa-bell"></i> ${data.msg} </p>


`


}



}


function disblydata(){


if (nodlist.length< 1) {
    rowData.innerHTML =""
     rowData.innerHTML= " <p>NO DATA FOUND </p";
   return
    
}


    let cartona= ""

    for (let i = 0; i < nodlist.length; i++) {


        cartona+=`
                
 <div class="col-md-4">

    <div class="card w-100 text-center" >
         
          <div class="card-body">
            <h2 class="card-title">${nodlist[i].title}</h2>
            <p class="card-text">
             ${nodlist[i].content}
            </p>
           <div class="card-footer">
           <button class="btn btn-outline-danger"  onclick="delteData('${nodlist[i]._id}')">delet<i class="fa-solid fa-trash"></i></button>
           <button class="btn btn-outline-warning"  onclick=" setData(${i})">updet<i class="fa-solid fa-highlighter"></i></button>

           </div>
          </div>
        </div>
 </div> 

        
        
        `       
    }
    rowData.innerHTML=cartona;
}

 async function delteData(id){
try {

    

    let res = await fetch(`https://note-sigma-black.vercel.app/api/v1/notes/${id}` ,{
        method: 'DELETE',
        headers:{
           token:`3b8ny__${localStorage.getItem("userToken")}` , 
        }
    })

    let data = await res.json() 

    if(data.msg==='done'){
        
    Swal.fire({
  title: "Good job!",
  text: `${data.msg}`,
  icon: "success"
});

if(res.ok ){
    getuserdate()

}

    } else{


    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: `${data.msg}`,
});

    }
    
    

    
} catch (error) {
    
}
}


 
function setData(index){

    cuurntid= nodlist[index]._id

noteTitel.value=nodlist[index].title
noteContent.value=nodlist[index].content

addNote.classList.add("d-none")
updetNote.classList.remove("d-none")



}





updetNote.addEventListener("click" , async  function(e){
    e.preventDefault()
   
    

updeetData()

})



 async function updeetData() {


try {




 let usertoken2 ={
    title:noteTitel.value ,
    content: noteContent.value,
}


let res = await fetch(`https://note-sigma-black.vercel.app/api/v1/notes/${cuurntid}`,{
    method : "PUT",
    
    body :JSON.stringify(usertoken2) ,
     headers: {
    "Content-Type" : "application/json",
    token:`3b8ny__${localStorage.getItem("userToken")}` ,
    },

})


let data = await res.json()

if (data.msg === "done" && res.ok) {

    
    Swal.fire({
  title: "Good job!",
  text: `${data.msg}`,
  icon: "success"
});
   
addNote.classList.remove("d-none")
updetNote.classList.add("d-none")
getuserdate()

    
}else{

    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: `${data.msg}`,
});

}





    
} catch (error) {
    
    console.log( "error : ", error);
    
}


    
}



























































// var allproduct=[]

// if(localStorage.getItem("box")){

    
// JSON.parse(localStorage.getItem("box"))
// allproduct =JSON.parse(localStorage.getItem("box"))
//    displydata()

// }
// function addproduct(){




//     var product={
//         Znama :pnamem.value,
//         Zbriec : pbriec.value,
//         cat: pcatagry.value,
//           des  :  bdescrisin.value,  
//           image :  bfie.files[0]?bfie.files[0]?.name : "header-bg.jpg"
//     }

   

//     allproduct.push(product)

//      displydata()
    
//      localStorage.setItem("box"  , JSON.stringify(allproduct) )
// }


// function displydata(){

//     var cartona=""

//     for( i=0 ; i <allproduct.length ; i++){

//         cartona +=`
        
        
//         --     
//    <div class="col-md-3">
//    <div class="card text-center">
//     <img src="image/${allproduct[i].image}" class="img-fluid"  alt="add">
//     <span>${i+1}</span>
//     <h3>${allproduct[i].Znama}</h3>
//     <p>${allproduct[i].Zbriec}</p>
//     <p>${allproduct[i].cat}</p>
//     <p>${allproduct[i].des}</p>
//     <div class="card-footer">  
//   <button  onclick="delaatData(${i})" class="btn btn-outline-danger">Delaat</button>
//   <button   onclick="setdadta(${i})"  class=" btn btn-outline-warning" >updet</button>

//     </div>   
//    </div>

//    </div> -->

//    </div>
        
        
//         `

//     }

//   document.getElementById("rowdata").innerHTML =cartona;
// }


// function delaatData(index){
//     allproduct.splice(index ,1)
//  localStorage.setItem("box"  , JSON.stringify(allproduct) )
//  displydata()


// }

// function serch(){
// var text = serchinput.value;
//   var cartona =""
// for (let i = 0; i < allproduct.length; i++) {
//   if (allproduct[i].Znama.includes(text)) {

    
//         cartona +=`
        
        
           
//    <div class="col-md-3">
//    <div class="card text-center">
//    <img src="image/${allproduct[i].image}" class="img-fluid"  alt="add">
//     <span>${i+1}</span>
//     <h3>${allproduct[i].Znama}</h3>
//     <p>${allproduct[i].Zbriec}</p>
//     <p>${allproduct[i].cat}</p>
//     <p>${allproduct[i].des}</p>
//     <div class="card-footer">  
//   <button  onclick="delaatData(${i})" class="btn btn-outline-danger">Delaat</button>
//   <button   onclick="setdadta(${i})" class=" btn btn-outline-warning" >updet</button>

//     </div>   
//    </div>

//    </div> 

//    </div>
        
//         `
//   } 
// }
//  localStorage.setItem("box"  , JSON.stringify(allproduct) )
// document.getElementById("rowdata").innerHTML =cartona;
// }

// var cuurntaindex ;
// function setdadta(index){

// cuurntaindex=index

//     pnamem.value=allproduct[index].Znama
//     pbriec.value =allproduct[index].Zbriec
//     pcatagry.value= allproduct[index].cat
//     bdescrisin.value= allproduct[index].des
  
//     addpro.classList.add("d-none")
//    updpro.classList.remove("d-none")
// }


// function updet(){

  
//     var product={
//         Znama :pnamem.value,
//         Zbriec : pbriec.value,
//         cat: pcatagry.value,
//           des  :  bdescrisin.value, 
//           image :  bfie.files[0]?bfie.files[0]?.name : "header-bg.jpg"   
//     };
//     allproduct.splice(cuurntaindex , 1, product)
//  displydata()

//     addpro.classList.remove("d-none")
//    updpro.classList.add("d-none")

// }







// document.getElementById("pnamem")
// document.getElementById("pbriec")
// document.getElementById("pcatagry")
// document.getElementById("bdescrisin")
// document.getElementById("addpro")
// document.getElementById("bfie")
// document.getElementById("updpro")
// document.getElementById("serchinput")



// var pnamem =document.getElementById("pnamem");
// var pbriec =document.getElementById("pbriec");
// var pcatagry =document.getElementById("pcatagry");
// var bdescrisin =document.getElementById("bdescrisin");
// var addpro =document.getElementById("addpro");
// var bfie =document.getElementById("bfie");
// var updpro =document.getElementById("updpro");
// var serchinput=document.getElementById("serchinput");





// var allproduct=[]

// if(localStorage.getItem("box")){

    
// JSON.parse(localStorage.getItem("box"))
// allproduct =JSON.parse(localStorage.getItem("box"))
//    displydata()

// }
// function addproduct(){




//     var product={
//         Znama :pnamem.value,
//         Zbriec : pbriec.value,
//         cat: pcatagry.value,
//           des  :  bdescrisin.value,  
//           image :  bfie.files[0]?bfie.files[0]?.name : "header-bg.jpg"
//     }

   

//     allproduct.push(product)

//      displydata()
    
//      localStorage.setItem("box"  , JSON.stringify(allproduct) )
// }


// function displydata(){

//     var cartona=""

//     for( i=0 ; i <allproduct.length ; i++){

//         cartona +=`
        
        
//         --     
//    <div class="col-md-3">
//    <div class="card text-center">
//     <img src="image/${allproduct[i].image}" class="img-fluid"  alt="add">
//     <span>${i+1}</span>
//     <h3>${allproduct[i].Znama}</h3>
//     <p>${allproduct[i].Zbriec}</p>
//     <p>${allproduct[i].cat}</p>
//     <p>${allproduct[i].des}</p>
//     <div class="card-footer">  
//   <button  onclick="delaatData(${i})" class="btn btn-outline-danger">Delaat</button>
//   <button   onclick="setdadta(${i})"  class=" btn btn-outline-warning" >updet</button>

//     </div>   
//    </div>

//    </div> -->

//    </div>
        
        
//         `

//     }

//   document.getElementById("rowdata").innerHTML =cartona;
// }


// function delaatData(index){
//     allproduct.splice(index ,1)
//  localStorage.setItem("box"  , JSON.stringify(allproduct) )
//  displydata()


// }

// function serch(){
// var text = serchinput.value;
//   var cartona =""
// for (let i = 0; i < allproduct.length; i++) {
//   if (allproduct[i].Znama.includes(text)) {

    
//         cartona +=`
        
        
           
//    <div class="col-md-3">
//    <div class="card text-center">
//    <img src="image/${allproduct[i].image}" class="img-fluid"  alt="add">
//     <span>${i+1}</span>
//     <h3>${allproduct[i].Znama}</h3>
//     <p>${allproduct[i].Zbriec}</p>
//     <p>${allproduct[i].cat}</p>
//     <p>${allproduct[i].des}</p>
//     <div class="card-footer">  
//   <button  onclick="delaatData(${i})" class="btn btn-outline-danger">Delaat</button>
//   <button   onclick="setdadta(${i})" class=" btn btn-outline-warning" >updet</button>

//     </div>   
//    </div>

//    </div> 

//    </div>
        
//         `
//   } 
// }
//  localStorage.setItem("box"  , JSON.stringify(allproduct) )
// document.getElementById("rowdata").innerHTML =cartona;
// }

// var cuurntaindex ;
// function setdadta(index){

// cuurntaindex=index

//     pnamem.value=allproduct[index].Znama
//     pbriec.value =allproduct[index].Zbriec
//     pcatagry.value= allproduct[index].cat
//     bdescrisin.value= allproduct[index].des
  
//     addpro.classList.add("d-none")
//    updpro.classList.remove("d-none")
// }


// function updet(){

  
//     var product={
//         Znama :pnamem.value,
//         Zbriec : pbriec.value,
//         cat: pcatagry.value,
//           des  :  bdescrisin.value, 
//           image :  bfie.files[0]?bfie.files[0]?.name : "header-bg.jpg"   
//     };
//     allproduct.splice(cuurntaindex , 1, product)
//  displydata()

//     addpro.classList.remove("d-none")
//    updpro.classList.add("d-none")

// }