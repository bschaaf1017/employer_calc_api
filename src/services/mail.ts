// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


  export const sendIt = async (data: any): Promise<void> => {
    console.log('data: ', data)
    const msg = {
      to: 'brian.schaaf@sunnydayfund.com', // Change to your recipient
      from: 'brian.schaaf@sunnydayfund.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      templateId: process.env.TEMPLATE_ID,
      dynamic_template_data: data
      // text: 'and easy to do anywhere, even with Node.js',
      // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  }


