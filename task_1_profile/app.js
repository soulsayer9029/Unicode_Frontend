const name= document.querySelector('#name')
const email=document.querySelector('#e-mail')
const mobile= document.querySelector('#mobile')
const subject=document.querySelector('#subject')



document.querySelector("#submit").addEventListener('click',Validate);
function Validate(){
    
    ValidateName();
    ValidateMail();//calling the validating functions 
    ValidateMobile();
    //checking if everything is filled and there are no errors
    if(name.style.borderColor==="green" && email.style.borderColor==="green" && mobile.style.borderColor==="green"){
        console.log('form submitted succesfully')
        //adding an pop-up using sweet alert
        swal({
            title: "Form Validated",
            text: "Form Submitted Succesfully",
            icon: "success",
            button: "Okay"
        }).then(function() {
            name.value="";
            email.value="";//reseting all the parameters
            mobile.value="";
            subject.value="";
            document.location.reload();
        });

    }
    
}




//function to add error
function showErrorOutput(id,content){
    x=document.querySelector(id);//x 
    
    div=document.createElement('div');
    div.classList.add("error");
    text=document.createTextNode(content);
    div.appendChild(text); 
    x.appendChild(div);
      

}
//function to check if error is already there
//we had added the error by inserting  text in the next div and giving it error class which gives it red color
function checkError(id){
    x=document.querySelector(id);
    if(x.nextElementSibling){
        return true
    }else{                          //if check error returns true that means error exists
        return false
    }

}
function ValidateName(){
    
    const nameHead=document.querySelector('#name-head')
    if(name.value===""){
        alert("please fill All fields")
        
    }else{
        const re=/^[a-zA-Z ]{2,10}$/;
        if(re.test(name.value)){    //if this is true means regex is satisfied
            if(checkError("#name")){               //if error is there we remove it
                name.nextElementSibling.remove();
            }
            name.style.borderColor="green"; //giving the border green color so that the user knows his input is correct
            
        }else{ //if input is not satisfied with regex
            if(!checkError("#name")){ //checking for error ,if not there then add one
            showErrorOutput('#name-head',"Your Name must be between 2-10 charecters(all alphabets)")
            name.style.borderColor="red";
            }   
        }
    } 
}
//similar logic is used for validating mail and mobile number
function ValidateMail(){
    
    const mailHead=document.querySelector('#mail-head');
    if(email.value===""){
        alert("please fill All fields")    

    }else{
        const re=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(re.test(email.value)){
            if(checkError("#e-mail")){
                email.nextElementSibling.remove();
            }
            email.style.borderColor="green";            ;
            
        }else{
            if(!checkError("#e-mail")){
            showErrorOutput('#mail-head',"Enter a valid e-mail id")
            email.style.borderColor="red";
            }   
        }
    } 
    

}
function ValidateMobile(){
    
    const mobileHead=document.querySelector('#mobile-head')
    
    if(mobile.value===""){
        alert("please fill All fields")

    }else{
        const re=/^[0-9]{10,10}$/;
        if(re.test(mobile.value)){
            if(checkError("#mobile")){
                mobile.nextElementSibling.remove();
            }
            mobile.style.borderColor="green";
            
        }else{
            if(!checkError("#mobile")){
            showErrorOutput('#mobile-head',"Enter a valid mobile number")
            mobile.style.borderColor="red";
            }   
        }
    } 

    
}
