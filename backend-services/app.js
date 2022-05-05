// import all the functions
let express = require("express");
let app = express();
let cors = require("cors");
let bodyParser = require("body-parser");
let mongoClient = require("mongodb").MongoClient;
let PORT = 3001;
let dbURL = "mongodb://localhost:27017";
// start the server 
app.listen(PORT, () => console.log(`Server is running in ${PORT}`));

// apply the middleware
app.use(cors());
app.use(bodyParser.json());

//create the services for contact app
// storing the profile 
app.post("/profile", (request, response) => {
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if(error) {
            throw error;
        } else {
            let db = client.db("mydb");
            let profile = request.body; // _id, name, phone, dob, password, contacts:[];
            profile.contacts = [];
            db.collection("profile").insertOne(profile, (err, res) => {
                if(err) {
                    response.status(409).json({"message":`Profile ${profile._id} exists`})
                } else {
                    response.status(201).json(res);
                    client.close();
                }
            });
        }
    });
});

//adding contacts
app.put("/profile/:id/addContact", (request, response) => { 
    let id = parseInt(request.params.id);
    let contact = request.body;
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if(error) {
            throw error;
        } else {
            let db = client.db("mydb");
            db.collection("profile").updateOne({_id: id}, {$push: {contacts: contact}})
            .then((doc) => {
                response.json(doc);
                client.close();
            });
        }
    });
});

//login service
app.get("/profile/:id/:password", (request, response) => { 
    let id = parseInt(request.params.id);
    let pass = request.params.password;
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if(error) {
            throw error;
        } else {
            let db = client.db("mydb");
            db.collection("profile").findOne({_id: id, password: pass})
            .then((doc) => {
                if(doc!=null) {
                    response.json(doc)
                } else {
                    response.status(404).json({"message":`Sorry id or password is wrong`})
                }
                client.close();
            });
        }
    });
});
// find a contact of a particular profile
app.get("/profile/:id/contacts/:name", (request, response) => {
    let id = parseInt(request.params.id);
    let name = request.params.name;
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if(error) {
            throw error;
        } else {
            let db = client.db("mydb");

            db.collection("profile").findOne({_id: id})
            .then(doc => {
                if(doc != null) {
                    let contacts = doc.contacts;
                    console.log('doc contacts: '+doc.contacts);
                    let counter = 0;
                    let contactsList = [];
                    for(let i = 0; i < contacts.length; i++) {
                        if(contacts[i].name == name) {
                            counter++;
                            contactsList.push(contacts[i]);
                        }
                    }
                    if(counter == 0) {
                        contacts = [];
                        response.json(contacts);
                    } else {
                        response.json(contactsList);
                    }
                } else {
                    response.json({'message': `Sorry wrong id: ${id}`})
                }
                client.close();
            });
        }
    });
});

//Complete other services here
//
//
//
//
//
//
//
// delete the particular contact based on profile id: /profile/:id/contacts/:contactId 
app.delete("/profile/:id/contacts/:contactId", (request, response) => { 
    let id = parseInt(request.params.id);
    let contactId = parseInt(request.params.contactId);
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if(error) {
            throw error;
        } else {
            let db = client.db("mydb");
            db.collection("profile").updateOne({_id: id},{$pull:{"contacts":{"_id":contactId}}})
            .then((doc) => {
                if(doc!=null) {
                    response.json(doc)
                } else {
                    response.status(404).json({"message":`Sorry id`})
                }
                client.close();
            });
        }
    });
});
// show all contacts based on profile id: /profile/:id/contacts
app.get("/profile/:id/acc/contacts",(req,response) =>{
    let id = parseInt(req.params.id);
    mongoClient.connect(dbURL,{useNewUrlParser:true},(error, client)=>{
        if(error)
        throw error;
        //use mydb instance
        let db = client.db("mydb");
        db.collection("profile").findOne({"_id":id})
        .then((doc) => {
            if(doc != null){
                let contacts = doc.contacts;
                response.json(contacts);
            }else{
                response.status(404).json({"message":`Sorry ${id} doenst exist !`});
            }
            client.close();
        })
    })
})
//show one Profiles with contacts 
app.get("/profile/:id", (request, response) => { 
    let id = parseInt(request.params.id);
    mongoClient.connect(dbURL, {useNewUrlParser:true}, (error, client) => {
        if(error) {
            throw error;
        } else {
            let db = client.db("mydb");
            db.collection("profile").findOne({_id: id})
            .then((doc) => {
                if(doc!=null) {
                    response.json(doc);
                } else {
                    response.status(404).json({"message":`Sorry wrong id ${id}`})
                }
                client.close();
            });
        }
    });
});
// update the contact phone number of a partiular profile id: /profile/:id/contacts/:contactId/phone/:num
app.put("/profile/:id/contacts/:contactId/phone/:num",(request,response)=>{
    let id = parseInt(request.params.id);
    let num =parseInt(request.params.num);
    let contactId = parseInt(request.params.contactId)
    mongoClient.connect(dbURL,{useNewUrlParser:true},(error,client)=>{
        if(error)
            throw error;
        let db = client.db("mydb");
        //use the collection "user" and update
        db.collection("profile").updateOne(
            { _id: id, "contacts._id": contactId },
            { $set: { "contacts.$.phone" : num} }
         )
        .then((doc)=>{
            response.json(doc);
            client.close();
        })
    })
})
// update the phone number of particular profile id: /profile/:id/phone/:num
app.put("/profile/:id/phone/:num",(request,response)=>{
    let id = parseInt(request.params.id);
    let num =parseInt(request.params.num);
    mongoClient.connect(dbURL,{useNewUrlParser:true},(error,client)=>{
        if(error)
            throw error;
        let db = client.db("mydb");
        //use the collection "user" and update
        db.collection("profile").updateOne({_id:id},{$set:{phone:num}})
        .then((doc)=>{
            response.json(doc);
            client.close();
        })
    })
})
// update the dob of particualr Lucifer-1-1998-09-23 profile id: /profile/:id/dob/:dob
app.put("/profile/:id/dob/:dob",(request,response)=>{
    let id = parseInt(request.params.id);
    let dob =request.params.dob;
    mongoClient.connect(dbURL,{useNewUrlParser:true},(error,client)=>{
        if(error)
            throw error;
        let db = client.db("mydb");
        //use the collection "user" and update
        db.collection("profile").updateOne({_id:id},{$set:{dob:dob}})
        .then((doc)=>{
            response.json(doc);
            client.close();
        })
    })
})
// update the password of particular profile id: /profile/:id/password/:pass
app.put("/profile/:id/password/:pass",(request,response)=>{
    let id = parseInt(request.params.id);
    let pass =request.params.pass;
    mongoClient.connect(dbURL,{useNewUrlParser:true},(error,client)=>{
        if(error)
            throw error;
        let db = client.db("mydb");
        //use the collection "user" and update
        db.collection("profile").updateOne({_id:id},{$set:{password:pass}})
        .then((doc)=>{
            response.json(doc);
            client.close();
        })
    })
})
app.delete("/profile/:id",(request,response) =>{
    let id = parseInt(request.params.id);
    mongoClient.connect(dbURL,{useNewUrlParser:true},(error,client) =>{
        if(error)
            throw error;
            let db = client.db("mydb");
            db.collection("profile").deleteOne({_id:id})
            .then((doc) => {
                response.json(doc);
                client.close();
         })
    })
})