import sgMail from '@sendgrid/mail'
import fs from 'fs'
// import easyinvoice from 'easyinvoice';
import html_to_pdf from 'html-pdf-node'

import { Company } from '@server/models/company'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const  emailTemplate_sdf = async (options: Company) => {
  let html = fs.readFileSync('src/services/email/pdf_template.html', 'utf8');

  // html = html.replace(/{{BASE_URL}}/g, strapi.config.currentEnvironment.uiHostEmp);
  // html = html.replace("{{SALUTATION}}", options.salutation);
  // html = html.replace("{{BODY_CONTENT}}", options.body);
  html = html.replace(/{{REWARD_MODEL}}/g, options.model);
  html = html.replace(/{{NUM_EMPS}}/g, options.num_emps);
  html = html.replace(/{{SALARY}}/g, options.salary);
  html = html.replace(/{{TURNOVER}}/g, options.turnover);
  html = html.replace(/{{PARTICIPATION}}/g, options.participation);
  html = html.replace(/{{CONT_CAP}}/g, options.cont_cap);
  html = html.replace(/{{TURNOVER_TEXT}}/g, options.turnover_text);
  html = html.replace(/{{PRODUCTIVITY_TEXT}}/g, options.poductivity_text);
  html = html.replace(/{{RETIREMENT_TEXT}}/g, options.retirment_text);
  html = html.replace(/{{SAVINGS_TEXT}}/g, options.savings_text);

  return html;
}

const createPDF = async (html) => {
  const file = {content: html}
  const options = { format: 'A4' };
  const pdf = await html_to_pdf.generatePdf(file, options)
  return pdf;
}

export const sendIt = async (data: Company): Promise<void> => {
  const html = await emailTemplate_sdf(data);
  const pdf = await createPDF(html);
  // const onePager = fs.readFileSync('src/services/email/sdf_onepager.pdf').toString('base64');
  const msg = {
    to: ['bschaaf1017@gmail.com','brian.schaaf@sunnydayfund.com', 'brandon@sunnydayfund.com', 'cyrus.bakhshi@sunnydayfund.com', 'sid.pailla@sunnydayfund.com'], // Change to your recipient
    from: 'brian.schaaf@sunnydayfund.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    templateId: process.env.TEMPLATE_ID,
    dynamic_template_data: data,
    attachments: [
      {
        content: pdf.toString('base64'),
        filename: "savings-with-sdf.pdf",
        type: "application/pdf",
        disposition: "attachment"
      }
    ]
  }
  sgMail
    .send(msg)
    .then(() => {
      // console.log('Email sent: ', data)
    })
    .catch((error) => {
      console.error(error)
    })
}


