let email=document.getElementById('email');
let password=document.getElementById('password');
let myDiv=document.getElementById('myDiv');
let submit=document.getElementById('submit');
let register=document.getElementById('register');



submit.addEventListener('click', function(){
    console.log("CLICK");
    if(validation()){
        login('http://localhost:80/hotel/app/admin/php/login',{email:email.value,password:password.value})
        .then((res)=>{
            if(res['status']==400){
                myDiv.innerHTML=res['msg']

                //redirect to jobpage
                function redirect(username,email){
                 //local storage
                const datatoStore={name:username,email:email}
                sessionStorage.setItem('hotel_admin',JSON.stringify(datatoStore));
                window.location.href='/app/admin/dashboard/admin.html';
                }
                setTimeout(redirect(res['name'],res['email']),2000);
            }else{
                myDiv.innerHTML="Invalid login details!";
            }
        })
    }else{
    console.log("Validation has been fail !");
    }
    
})



async function login(url, data) {
    const response = await fetch(url, {
      method: "POST", 
       mode: "cors", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    });
    return response.json();
  }



function validation(){
    let isValidate=true;
    if(email.value===""){
        text="Enter the name";
        email.placeholder=text;
        email.style.borderColor="red";
        isValidate=false;
    }
    if(password.value===""){
        text="Enter the password";
        password.placeholder=text;
        password.style.borderColor="red";
        isValidate=false; 
    }

    if(email.value!=""){
        email.style.borderColor="green";
    }
    if(password.value!=""){
        password.style.borderColor="green";
    }
    return isValidate;
}

register.addEventListener('click', function(e){
e.preventDefault();
window.location.href='/app/admin/login/register.html';
})