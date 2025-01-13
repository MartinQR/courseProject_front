const accountData = {
  Name: "Nueva Cuenta#5",
  Type: "Customer5",
  Industry: "Oil",
  Phone: "9876543210",
  Website: "http://www.ejemplo2.com",
};
const contactData = {
  FirstName: "Martin",
  LastName: "Quiroz",
  Instagram__c: "@quirozrmartin",
  Fax: "345634563456",  
  Email: "martin.quiroz@ejemplo.com",
  Phone: "9934017631",
};

async function createAccountAndContact() {
  const instanceUrl = "https://quiroz-dev-ed.develop.my.salesforce.com";
  const accessToken =
    "00Daj00000KXNtb!AQEAQITsnynVlmjKi4UcqAw4NF4P4Wmb4mujzxD7afq45YT.sgzuNZ5StslnJTtsQFnGrRa.ixhRG4ygRdKcNWVcDjYwjC6f";

  // Create Acount
  const accountResponse = await fetch(
    `${instanceUrl}/services/data/v62.0/sobjects/Account/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountData),
    }
  );

  const account = await accountResponse.json();

  if (account.id) {
    const accountId = account.id;

    contactData.AccountId = accountId;

    const contactResponse = await fetch(
      `${instanceUrl}/services/data/v62.0/sobjects/Contact/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      }
    );

    const contact = await contactResponse.json();

    if (contact.id) {
      return { account, contact };
    } else {
      console.error("Error creando el contacto:", contact);
      return null;
    }
  } else {
    console.error("Error creando la cuenta:", account);
    return null;
  }
}


async function getAccessToken() {
  console.log("Entra funcion Get Access Token");
  const clientId =
    "3MVG9XgkMlifdwVDVJm9VyCYhR.LCe2nNkgVwmgECwshUYFSef08kglhcku50BGmFthXmdSEhI7yAb7fosWaK";
  const redirectUri = "http://localhost:5173/callback";
  const authorizationUrl = `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

  window.location.href = authorizationUrl;
}

export { getAccessToken, createAccountAndContact };
