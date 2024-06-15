let username= document.getElementById('username');
let email= document.getElementById('email');
let phone= document.getElementById('phone');
let password= document.getElementById('password');
let confirm_password= document.getElementById('re_password');
let myDiv= document.getElementById('myDiv');
let submit= document.getElementById('submit');
let login=document.getElementById('login');

let data={
    username,
    email,
    phone,
    password,
    confirm_password
}

let orginalData={
    username:username.value,
    phone:phone.value,
    email:email.value,
    password:password.value,
}


submit.addEventListener('click', function(e){
    e.preventDefault();
    if(validation(data)){
        checkEmail('http://localhost:80/hotel/app/admin/php/checkemail_admin',{email:email.value})
        .then((res)=>{
            console.log(res);
            if(res['status']==400){
                //Checking email already present or not
                myDiv.innerHTML=res['msg'];
            }
            else{
                postData('http://localhost:80/hotel/app/admin/php/register.php',{
                    email:email.value,
                    phone:phone.value,
                    password:password.value,
                    username:username.value
                })
                .then((res)=>{
                // Success Register msg
                myDiv.innerHTML=res['msg'];
           

                //REDIRECTING
                function redirect(){
                const datatosend={name:namee.value,email:email.value}
                const queryString=new URLSearchParams(datatosend).toString();
                window.location.href='Otp-verification.html?'+queryString;
                }
                
                // setTimeout(redirect,2000);

                })
                .then((data)=>console.log(data));
                
            }
        })
        console.log(orginaData);
        }else{
            console.log("Not Validated")
        }
    
});


async function postData(url, data) {
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

  async function checkEmail(url,data){
    const response=await fetch(url,{
    method:"POST",
    mode:'cors',
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify(data)
    });
    return response.json();
  }

function validation(data){
    isValidate=true;
    let errorMessage=[];
    // console.log("Error Msg",errorMessage);
    
    function checkPhone(){
        if(data.phone.value.length<10){
           text="Phone number is invalid !";
           data.phone.style.borderColor="red";
           errorMessage.push(text);
           isValidate=false;
        }else{
           data.phone.style.borderColor="green";
        }
       }
    
    function checkEmail(){
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email.value))){
            text="Enter a valid email !";
            errorMessage.push(text);
            data.email.style.borderColor="red";
            isValidate=false;
        }else{
            data.email.style.borderColor="green";
        }
    }

    function checkPassword(){
        if(data.password.value.length<8){
        text="Password should be minimum 8 digits !";
        data.password.style.borderColor="red";
        errorMessage.push(text);
        isValidate=false;
        }else{
        data.password.style.borderColor="green";
        }
    }

    function checkConfirmPassword(){
        if(data.confirm_password.value!==data.password.value){
            text="Password does not match";
            data.confirm_password.style.borderColor="red";
            errorMessage.push(text);
            isValidate=false;
        }else{
            data.confirm_password.style.borderColor="green";  
        }
    }

   if(data.username.value===""){
        text="Enter the name";
        data.username.placeholder=text;
        data.username.style.borderColor="red";
        isValidate=false;
    }
    if(data.phone.value===""){
        text="Enter the phone number";
        data.phone.placeholder=text;
        data.phone.style.borderColor="red";
        isValidate=false; 
    }
 
    if(data.email.value===""){
        text="Enter the email";
        data.email.placeholder=text;
        data.email.style.borderColor="red";
        isValidate=false;
    }
  
    if(data.password.value===""){
        text="Enter the password";
        data.password.placeholder=text;
        data.password.style.borderColor="red";
        isValidate=false;
    }

    if(data.confirm_password.value===""){
        text="Enter the confirm password";
        data.confirm_password.placeholder=text;
        data.confirm_password.style.borderColor="red";
        isValidate=false;
    }
   
   
    

    // CHECKING
    if(data.username.value!=""){
        data.username.style.borderColor="green";
    }
    if(data.phone.value!=""){
        checkPhone();
    }
  
    if(data.email.value!=""){
        checkEmail();
    }
    if(data.password.value!=""){
        checkPassword();
    }
    if(data.confirm_password.value!=""){
        checkConfirmPassword();
    }
    if(errorMessage.length>0){
        myDiv.innerHTML=errorMessage[0];
    }
    else{
        myDiv.innerHTML="fill up the form";
    }
    
    return isValidate;
}

login.addEventListener('click', function(e){
    e.preventDefault();
    window.location.href='/app/admin/login/login.html';
    })