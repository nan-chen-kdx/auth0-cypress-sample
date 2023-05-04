const login = () => {
  const cookieName = 'appSession';
  const tokenEndpoint = `https://dev-karius.auth0.com/oauth/token`;
  const clientId = 'P2fVWJarFLng3hoqju6RoRTsMctK6bhB';
  const clientSecret = 'XeUD5oRCYCMSh8yvwuQLqoTB8E36ljgkkyvCsEBFRSSSMlnzxTyO_wB4MGXDR2lX';
  const audience = 'https://braavos.kariusdx.com';
  const scope = 'openid profile email';
  const cookieSecret = 'g6ccKad7kT-ONb7k2chqasx7IxaCnS7RPhpVNkBcj9i0Io6AT8ioLHQCEl4o9YK0'
  const email = 'unit-tests@kariusdx.com'
  const password = "iMV9JfR6N5u0"
  const options = {
    body: {
      client_id: clientId,
      client_secret: clientSecret,
      audience: audience,
      scope,
      username: email,
      password,
      grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
      realm: 'Username-Password-Authentication'
    },
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    url: tokenEndpoint
  };


  // Use the Resource Owner Password Flow to get the test user's access token
  cy.request(options).then(async ({ body }) => {
    const { access_token: accessToken } = body;
    console.log("access_token")
    console.log(accessToken)
    cy.task('getSessionCookie', {
      session: { accessToken, user: { email } },
      config: { secret: cookieSecret }
    }).then((cookie) => {
      // Set the cookie
      cy.setCookie(cookieName, cookie);
    });
  });
}


describe('template spec', () => {
  it('passes', () => {
    login()
    cy.visit("https://accession-web.echo.kariusdx.com/")
  })
})