var nameform = document.getElementById("name").value;
var email = document.getElementById("email").value;
var subject = document.getElementById("subject").value;
var message = document.getElementById("message").value;
var body = "<h2>Message from: " + name + "</h2><p>" + message + "</p>";

console.log(nameform, email, subject);

function sendEmail() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    var body = "<h2>Message from: " + name + "</h2><p>" + message + "</p>";

    console.log(name, email, subject);

    Email.send({
        Host: "smtp.mailtrap.io",
        Username: "Jose David Chay Grijalva",
        Password: "BcaW!ic2j42_N3U",
        To: 'chepechay16@gmail.com',
        From: email,
        Subject: subject,
        Body: body
    }).then(
        message => alert("Mail sent successfully"),
        console.log("email has been sended successfuly")
    );
}
