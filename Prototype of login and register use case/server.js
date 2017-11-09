var bodyParser = require('body-parser'); //enable server to read from encoded POST information
var express    = require('express');  //enable express framework
var lineReader = require('line-reader');  //to read lines from a certain html file

var signup_user_name;  //to store the signup username
var signup_pass_word;  //to store the signup password
var signup_res;  //to store the response message to signup page
var reg=/^[a-zA-Z0-9]{5,12}$/;  //regular expression used to validate signup information

var login_user_name;  //to store the login username
var login_pass_word;  //to store tge login password
var login_res;  //to store the response message to login page

var id_and_psw;  //to store user's input and post it in console later


var app = express();  //start express function
var urlencodedParser = bodyParser.urlencoded({ extended: false });  //used later to get POST information
app.use(express.static('public'));  //enable client browser to read static files like css, javascript and img files



app.get('/', 
    function(req, res)    //routing for homepage
    {
        var html = '';   //route to "homepage.html" when user visits localhost:3000
        lineReader.eachLine("homepage.html",
            function(line, last)
            {
                html += line + '\n';

                if (last) 
                { 
                    res.send(html);  //response with homepage.html content
                    return false; 
                }
                else
                {
                    return true;
                }
            });
    });

app.get('/homepage.html',
    function(req, res)   //similar to above
    {
        var html = '';
        lineReader.eachLine("homepage.html",  //route to "homepage.html" when user visits localhost:3000/homepage.html
            function(line, last)              //also enable links on the website "Homepage"
            {
                html += line + '\n';

                if (last)
                {
                    res.send(html);
                    return false;
                }
                else
                {
                    return true;
                }
            });
    });


app.get('/' + "login.html",   //route to login.html page when user visits localhost:3000/login.html
    function(req, res)
    {
        var html = '';
        lineReader.eachLine("login.html",
            function(line, last)
            {
                html += line + '\n';

                if (last) 
                { 
                    res.send(html);
                    return false; 
                }
                else
                {
                    return true;
                }
            });
    });

app.get('/' + "signup.html",   //route to signup.html page when user visits localhost:3000/signup.html
    function(req, res)
    {
        var html = '';
        lineReader.eachLine("signup.html",
            function(line, last)
            {
                html += line + '\n';

                if (last)
                {
                    res.send(html);
                    return false;
                }
                else
                {
                    return true;
                }
            });
    });




app.post('/process_post', urlencodedParser, function (req, res) {  //This part is to handle signup function
   // Prepare output in JSON format
    id_and_psw = {
      signup_user_name:req.body.userName,   //used to post user input in the console later
      signup_pass_word:req.body.passWord
   };
   signup_user_name = req.body.userName;
   signup_pass_word = req.body.passWord;
   if(signup_user_name == "" || signup_pass_word==""){    //check if username and/or password is blank
       signup_res = "Username/Password can't be blank.";
   }
   else if(!(reg.test(signup_user_name))||!(reg.test(signup_pass_word))){  //validate username and password
       signup_res = "Username/Password can only be 5-12 characters long with only letters and digits.";
   }
   else if(signup_user_name == "admintest"){  //check if username already exists.
       signup_res = "ID exists, sign up failed.";
   }
   else{ //otherwise, signup successfully.
       signup_res = "Sign up successfully! Your user name is "+signup_user_name;
   }
   console.log(id_and_psw);  //post user's input of username and password
   console.log(signup_res);  //post the conclusion made by the server in the console
   //res.send(res_message);
   var html = '';
        lineReader.eachLine("signup.html",
            function(line, last)
            {
                html += line + '\n';

                if (last) 
                { 
                    html += signup_res;  //post the conclusion to user's browser
                    res.send(html);
                    return false; 
                }
                else
                {
                    return true;
                }
            });
});


app.post('/login_post', urlencodedParser, function (req, res) {  //This part is to handle login function
   // Prepare output in JSON format
    id_and_psw = {
      login_user_name:req.body.userName,  //used to post user input in the console later
      login_pass_word:req.body.passWord
   };
   login_user_name = req.body.userName;
   login_pass_word = req.body.passWord;
   if(login_user_name == "" || login_pass_word==""){  //check if input is empty
       login_res = "Please type in username/password.";
   }
   else if(login_user_name != "admintest" || login_pass_word != "admintest"){
       login_res = "Incorrect ID or password. Please re-enter";     //check if ID and password combination matches
   }
   else if(login_user_name == "admintest" && login_pass_word == "admintest"){
       login_res = "Hello admintest! Log in succesfully!";    //check if ID and password combination matches
   }
   else{  //handle error
       login_res = "Input Error";
   }
   console.log(id_and_psw);  //post user's input of username and password
   console.log(login_res);   //post the conclusion made by the server in the console
   var html = '';
        lineReader.eachLine("login.html",
            function(line, last)
            {
                html += line + '\n';

                if (last) 
                { 
                    html += login_res;  //post the conclusion to user's browser
                    res.send(html);
                    return false; 
                }
                else
                {
                    return true;
                }
            });
});





app.listen(3000, function () {  //server listens on port 3000
  console.log('Spartan Tour server app is listening on port 3000!');  //post this in the console when server starts running
});