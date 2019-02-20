const express = require('express');
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req, res) => {
    res.send('An alligator approaches!');
});

const users = [
  { _id:1,  "name": "Paul", "email": "paul@example.com" , "login": "paul" },
  { _id:2, "name": "Ringo", "email": "ringo@example.com"  ,"login": "ringo" },
  { _id:3,  "name": "John", "email": "john@example.com" , "login": "john" },
  { _id:4,  "name": "George", "email": "george@example.com" , "login": "george" }
]

const findUnique = (prop, value, id) => {



  return new Promise((resolve, reject)=>{
    let _users = [];
    if(id){
      _users = users.filter(u=>u._id != id);
    }else{
      _users = users;
    }
    _users = _users.filter((item) => item[prop] == value);
    return resolve( { error:false, isNotUnique: _users.length > 0  } );
  });
}

app.post("/usuarios/validate-unique/:prop/:value", (req, res)=>{

  return findUnique(req.params.prop, req.params.value, req.query.id)
  .then((result)=> res.json(result))
  .catch((err) => { res.json(err) });




  // res.send(`Prop: ${req.params.prop} Value: ${req.params.value}`);


})

app.listen(3000, () => console.log('Gator app listening on port 3000!'));
