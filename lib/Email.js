const nodemailer = require('nodemailer')


function SendMail(UserEmail,validToken){
    validToken = validToken.replace(/['"]/g, '');
    const senderEmail = 'mohamadchavoshi760@gmail.com'
    const senderEmailPassword = 'bcctbjwvdoflaixy'
    const EmailSubject = 'Verification of QTicket account'
    const apiurl = 'https://localhost:3443'
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
          user: senderEmail,
          pass: senderEmailPassword
        }
      });

    var mailOptions = {
        from: senderEmail,
        to: UserEmail,
        subject: EmailSubject,
        html: `<link rel="stylesheet"href="https://fonts.googleapis.com/css?family=Lalezar"><h2 style="color: rgb(209, 91, 12);font-family: Lalezar;"><b>Welcome</b> to <span style="color: rgb(209, 91, 12);font-family: Lalezar;font-size: 50;">QTicket</span> family</h1><h3 style="font-family: Arial, Helvetica, sans-serif, "Arial Narrow", Arial, sans-serif;color: rgb(12, 0, 56);">This is a <span style="color: rgb(18, 0, 59);font-weight: bolder;font-family: Lalezar;font-size: larger;">Verification</span> Email for your <span style="font-family: Lalezar;font-size: 30;">QTicket</span> account. if you didn&lsquo;t register in our system please ignore this email. <br><br>Click <a style="font-weight: bolder;text-decoration: none;color: rgb(204, 2, 2);" href="${apiurl}/UserRegister/emailvalidation?validtoken=${validToken}&UEmail=${UserEmail}">Here</a> to Verify your account</h3>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        }
    });
}

module.exports = {SendMail}