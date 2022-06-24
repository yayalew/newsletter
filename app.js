
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})



mailchimp.setConfig({
    apiKey: "4584c403c03240f5d949617181399b6a-us10",
    server: "us10",
});

app.post("/", function (req, res) {
    //*****************************CHANGE THIS ACCORDING TO THE VALUES YOU HAVE ENTERED IN THE INPUT ATTRIBUTE IN HTML******************************
    const firstName = req.body.firstName;
    const secondName = req.body.secondName;
    const email = req.body.email;
    //*****************************ENTER YOU LIST ID HERE******************************
    const listId = "9b1e5a2333";
    //Creating an object with the users data
    const subscribingUser = {
        firstName: firstName,
        lastName: secondName,
        email: email
    };
    //Uploading the data to the server
    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
         email_address: subscribingUser.email,
         status: "subscribed",
         merge_fields: {
         FNAME: subscribingUser.firstName,
         LNAME: subscribingUser.lastName
        }
        });
        console.log(response); 
        //If all goes well logging the contact's id
         res.sendFile(__dirname + "/success.html")
         console.log(
        `Successfully added contact as an audience member. The contact's id is ${
         response.id
         }.`
        
        );
 
        }
        //Running the function and catching the errors (if any)
        // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
        // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
         run().catch(e => res.sendFile(__dirname + "/failure.html"));
        });

    
    //Running the function and catching the errors (if any)
    // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
    // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page


app.post("/failure.html",function(req,res) {
    res.redirect('/');
})




app.listen(process.env.PORT || 3000, function () {
    console.log("Server is up and running on port 3000");
})


// API KEY 
// 4584c403c03240f5d949617181399b6a-us10 

// List ID 
// 9b1e5a2333