import axios from "axios"

//Below function serves for two purpose
//for the registration its just if the email or phone is in the database or not
//but for the update profile page, it checks two thing
// 1 - if the updating email or phone is user's current one or not. because if its user's email, dont need to worry about conflicting with others data
// 2 - if it's not user's, it has to check if the email or phone is already in the database or not
// ONE THING TO KEEP IN MIND IS THAT ONE YOU WANT TO VALIDATE MUST THE FIRST ARGUMENT

export async function emailExist(email,updateEmail){  //function to check if email is in database
    console.log(email,updateEmail);
    if(email === updateEmail){
        return false
    }
    try {
        const checkEmail = await axios.get(`http://localhost:3030/users?email=${email}`).then(res=>res.data)  //get the data in database with the given email
        if(checkEmail.length != 0){ //if length of the data is not 0, the email is in the database
            return true
        }
        return false // else it means, there is no data with the given email and ok to create new account
    } catch(error){
        console.log(error);
    }   
}
export async function phoneExist(phone,updatePhone){  //function to check if phone is in database
    console.log(phone,updatePhone);
    if(phone === updatePhone){
        return false
    }
    try {
        const encodedPhone = phone.replace(/\D/g, '')   //strip + sign 
        const checkPhone = await axios.get(`http://localhost:3030/users?phone=%2b${encodedPhone}`).then(res=>res.data)  //get the data in database with the given phone
        if(checkPhone.length != 0){ //if length of the data is not 0, the number is in the database
            return true
        }
        return false // else it means, there is no data with the given phonenumber and ok to create new account
    } catch(error){
        console.log(error);
    }   
}