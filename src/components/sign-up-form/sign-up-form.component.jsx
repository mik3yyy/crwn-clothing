
import { useState, useEffect } from "react";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword , createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss"

import Button from "../button/button.component";

const defaulFormFields = {
    displayName : '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaulFormFields);

    const {displayName, email,password, confirmPassword} = formFields;

    
    console.log(formFields);

    function  resetFormField () {
        setFormFields (defaulFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password != confirmPassword){
            alert("password do not match");
            return;
        } 
        try {
            const response = await createAuthUserWithEmailAndPassword(email, password);
            console.log(response);
             await createUserDocumentFromAuth(response.user, {displayName })
            resetFormField(); 

        } catch(e) {
            if(e.code == "auth/email-already-in-user"){
                alert("email already in use")
            } else {
                console.log(e);

            }

        }
    }
    const handlechange = (event) => {


        const {name , value } = event.target;
       
        setFormFields({...formFields , [name] : value})
    }
    

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>

            <span>Sign up with your email and password</span>
          
            <form onSubmit={handleSubmit}>
                <FormInput label= "Display Name " type = "text" required onChange = {handlechange} name = 'displayName' value = {displayName}  />

                <FormInput label= "Email " type = "email" required onChange = {handlechange} name = 'email' value = {email}  />

                <FormInput label= "Password " type = "password" required onChange = {handlechange} name = 'password' value = {password}  />

                <FormInput label= "Confirm Password " type = "password" required onChange = {handlechange} name = 'confirmPassword' value = {confirmPassword}  />
                
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;