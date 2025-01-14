const defaultAccountData = {
  Name: "Nueva Cuenta#5",
  Type: "Customer",
  Industry: "Oil",
  Phone: "9876543210",
  Website: "http://www.ejemplo2.com",
};
const defaultContactData = {
  FirstName: "Martin",
  LastName: "Quiroz",
  Instagram__c: "@quirozrmartin",
  Fax: "345634563456",
  Email: "martin.quiroz@ejemplo.com",
  Phone: "9934017631",
};

async function createAccountAndContact(
  accountData = defaultAccountData,
  contactData = defaultContactData
) {
  //   const accessToken = await getAccessToken();
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
  const url = "https://login.salesforce.com/services/oauth2/token";
  const formData = new URLSearchParams();

  formData.append("grant_type", "password");
  formData.append(
    "client_id",
    "3MVG9XgkMlifdwVDVJm9VyCYhR.LCe2nNkgVwmgECwshUYFSef08kglhcku50BGmFthXmdSEhI7yAb7fosWaK"
  );
  formData.append(
    "client_secret",
    "E60E883BA66AA01A43E986022534DDF7F34FEBFC4FF5EE459CDBF023777CA724"
  );
  formData.append("username", "quirozrmartin@gmail.com");
  formData.append("password", "salesforceQuiroz.2");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        "User-Agent": "PostmanRuntime/7.42.0",
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
}

export { getAccessToken, createAccountAndContact };
