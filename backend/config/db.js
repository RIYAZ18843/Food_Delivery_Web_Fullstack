import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://hydsrh:hydsrh1234@cluster0.drtkp.mongodb.net/food-del').then(()=>console.log("DB Connected successfully"));
   
}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.