const nodemailer = require('nodemailer');

const sendEmailNotification = (email, subject, content) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail',
      pass: 'vsqn aucx wpzx dfrb',
    },
  });

  const mailOptions = {
    from: 'youremail@gmail.com',
    to: email,
    subject: subject,
    html: content,  // Use HTML here
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = {
  sendEmailNotification,
};
