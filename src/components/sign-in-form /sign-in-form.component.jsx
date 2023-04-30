
import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword , createUserDocumentFromAuth, signInWithGooglePopup , signInAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss"

import Button from "../button/button.component";



const defaulFormFields = {
    
    email: '',
    password: '',
    
}
const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaulFormFields);

    const { email,password} = formFields;


    

    function  resetFormField () {
        setFormFields (defaulFormFields)
    }

    const signInWithGoogle = async () => {

        const response = await signInWithGooglePopup();
         await createUserDocumentFromAuth(response.user);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

       
        try {
           const response= await signInAuthUserWithEmailAndPassword(email,password)
        resetFormField(); 

        } catch(e) {
          
          switch(e.code){
            case 'auth/wrong-password':
                alert("incorrect  password for email");
                break;
            case "auth/user-not-found":
                alert("user not found")
                break;
            default: 
                console.log(e);
            
          }
        //     if(e.code == "auth/wrong-password") {
        //     alert("incrrect password")
        //   } else if { 

        //   }
          console.log(e);

        }
    }
    const handlechange = (event) => {


        const {name , value } = event.target;
       
        setFormFields({...formFields , [name] : value})
    }
    

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>

            <span>Sign up with your email and password</span>
          
            <form onSubmit={handleSubmit}>

                <FormInput label= "Email " type = "email" required onChange = {handlechange} name = 'email' value = {email}  />

                <FormInput label= "Password " type = "password" required onChange = {handlechange} name = 'password' value = {password}  />
                
                <div className="buttons-container">
                <Button  type="submit">Sign In</Button>

                <Button type="button" buttonType='google' onClick ={signInWithGoogle} >Google Sign In</Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;