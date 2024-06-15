let reservation=document.getElementById('reservation');
let customers=document.getElementById('customers');
let confirm_reserve=document.getElementById('confirm_reserve');
let pending_reserve=document.getElementById('pending_reserve');
let customerTable=document.getElementById('customerTable');
let reservationDataTable=document.getElementById('reservationDataTable');
let confirm_booking=document.getElementById('confirm_booking');
let cancel_booking=document.getElementById('cancel_booking');
let select=document.getElementById('select');
let customers_tab=document.getElementById('pills-profile-tab');
let reservation_tab=document.getElementById('pills-home-tab');
let logout=document.getElementById('logout');
let signIn=document.getElementById('signIn');
let myDiv=document.getElementById('myDiv');
window.onload = (event) => {

    let storedata=sessionStorage.getItem('hotel_admin');
    let recived_data=JSON.parse(storedata);

    if(recived_data.name!="" && recived_data.email!=""){
      get_reserve('http://localhost:80/hotel/app/admin/php/GETdashboard')
      .then((res)=>{
        console.log(res);
        //RESERVATION TABLE START
        function insertDataIntoTable(data,datab,datac){
          reservationDataTable.getElementsByTagName('tbody')[0].innerHTML = '';
          data.forEach(function(item,i){
              // console.log(item);
              //ROW DECLEAR
              var row = reservationDataTable.insertRow();
              //INSERT DATA INTO CELLS OF THE ROW
              var id = row.insertCell(0);
              var email = row.insertCell(1);
              var start = row.insertCell(2);
              var end = row.insertCell(3);
              var type = row.insertCell(4);
              var timestamp=row.insertCell(5);
              var status=row.insertCell(6);
              var notes=row.insertCell(7);
  
              //SET DATA
              id.textContent=i+1;
              //START END TYPE TIMESTAMP
              start.textContent=item.start;
              end.textContent=item.end;
              type.textContent=item.type;
              timestamp.textContent=item.timestamp;
              //STATUS
              datab.map((x)=>{
                  if(item.id==x.bid){
                      status.textContent=x.status;
                      //EMAIL IS DONE BY NESTED LOOP PROCEES
                      datac.find((e)=>{
                          if(x.cid==e.cid){
                              // console.log(e.email);
                              email.textContent=e.email;
                          }
                      })
                  }
              })
              //NOTES
              datab.map((x)=>{
                  if(item.id==x.bid){
                      if(x.notes!=null && x.notes!=""){
                          notes.textContent=x.notes;
                      }else{
                          notes.textContent="NILL";
                      }
                  }
              })
              //ROW SELECTING
              row.addEventListener('click', function () {
                  row.classList.add('row1-hover');
                  // console.log('Row clicked:', item.id);
                  select.innerHTML="No."+" "+item.id +""+" row is selected";
                  //BUTTON CONFIRM
                  confirm_booking.addEventListener('click', function(e){
                      e.preventDefault();
                      console.log("CLICK CONFIRM");
                      console.log('Row clicked: CONFIRM', item.id);
                      if (window.confirm('Confirm the reservation ?')){
                          // They clicked Yes
                           update_rs('http://localhost:80/hotel/app/admin/php/update_rs',{id:item.id})
                           .then((res)=>{
                              // console.log(res);
                              if(res['status']==200){
                                myDiv.style.display='block';
                                myDiv.innerHTML=res['msg'];
                              }else{
                                myDiv.style.display='block';
                                myDiv.innerHTML=res['msg'];
                              }
                              function alterDisplay(){
                                myDiv.style.display='none';
                              }
                              setTimeout(alterDisplay,3000);
                              
                           })
  
                          async function update_rs(url,data){
                              const response = await fetch(url,{
                                method: "POST", 
                                 mode: "cors", 
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data), 
                              });
                              return response.json();
                            }
                      }else{
                          // They clicked no
                      }
                  })
                    //CANCEL CONFIRM
                    cancel_booking.addEventListener('click', function(e){
                      e.preventDefault();
                      console.log("CLICK CANCLE");
                      console.log('Row clicked: CANCEL', item.id);
                      if (window.confirm('Cancel the reservation ?')){
                          // They clicked Yes
                           update_cn('http://localhost:80/hotel/app/admin/php/update_cn',{id:item.id})
                           .then((res)=>{
                              // console.log(res);
                              if(res['status']==200){
                                myDiv.style.display='block';
                                myDiv.innerHTML=res['msg'];
                              }else{
                                myDiv.style.display='block';
                                myDiv.innerHTML=res['msg'];
                              }
                              function alterDisplay(){
                                myDiv.style.display='none';
                              }
                              setTimeout(alterDisplay,3000);
                           })
  
                          async function update_cn(url,data){
                              const response = await fetch(url,{
                                method: "POST", 
                                 mode: "cors", 
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data),
                              });
                              return response.json();
                            }
                      }else{
                          // They clicked no
                      }
                  })
              });
  
  
              row.addEventListener('mouseenter', function () {
                  // Add the hover effect class when the mouse enters the row
                  row.classList.add('row-hover');
              });
      
              row.addEventListener('mouseleave', function () {
                  // Remove the hover effect class when the mouse leaves the row
                  row.classList.remove('row-hover');
              });
              //END OF FOR EACH LOOP
          })
          
        }
        insertDataIntoTable(res.data,res.datab,res.datac);
        //TOTAL COUNT 
        reservation.innerHTML=res.data.length;
        customers.innerHTML=res.datac.length;
        let CR=0;
        let PN=0;
        res.datab.map((x)=>{
          if(x.status=="CONFIRMED"){
          CR+=1;
          }if(x.status=="PENDING"){
              PN+=1;
          }
        })
        confirm_reserve.innerHTML=CR;
        pending_reserve.innerHTML=PN;
  
        //COSTOMER TABLE START
        customers_tab.addEventListener('click', function(e){
        e.preventDefault();
        // reservationDataTable.style.display='none';
        CustomerTable(res.datac);
  
    })
  
    })
    //ELSE OF SESSION STORAGE
    }else{
      signIn.style.display="block";
      logout.style.display="none";
    }

    //END OF SESSION STORAGE

   
    function CustomerTable(data,datab,datac){
        customerTable.getElementsByTagName('tbody')[0].innerHTML = '';
        data.forEach(function(item,i){
            // console.log(item);
            //ROW DECLEAR
            var row = customerTable.insertRow();
            //INSERT DATA INTO CELLS OF THE ROW
            var id = row.insertCell(0);
            var name = row.insertCell(1);
            var email = row.insertCell(2);
            var phone = row.insertCell(3);

            //SET DATA
            id.textContent=i+1;
            name.textContent=item.fullname;
            email.textContent=item.email;
            phone.textContent=item.phone;
            //END OF FOR EACH LOOP
        })
        
      }
   
}

async function get_reserve(url) {
    const response = await fetch(url, {
      method: "GET", 
       mode: "cors", 
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

//LOGOUT BUTTON
logout.addEventListener('click', function(){
  let username="";
  let email="";
  const datatoStore={name:username,email:email}
  sessionStorage.setItem('hotel_admin',JSON.stringify(datatoStore));
})