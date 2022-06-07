import {Client} from '@hubspot/api-client';

import { Company } from '@server/models/company';

const hubspotClient = new Client({ apiKey: process.env.HUBSPOT_API_KEY });

export const addContact = async (data: Company): Promise<void> => {

  const contactObj = {
    properties: {
        firstname: data.your_name,
        email: data.company_email
    },
  }
  const companyObj = {
    properties: {
        domain: data.company_domain,
        name: data.company_name,
    },
  }
  try {
    const createContactResponse = await hubspotClient.crm.contacts.basicApi.create(contactObj)
    const createCompanyResponse = await hubspotClient.crm.companies.basicApi.create(companyObj)
    // console.log('created company: ', createCompanyResponse)
    await hubspotClient.crm.companies.associationsApi.create(
      createCompanyResponse.id,
      'contacts',
      createContactResponse.id,
      'company_to_contact'
    )
  } catch (e) {
    console.log('hubspot error: ', e)
  }
}
