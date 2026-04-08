import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const stripePaymentLink = "https://buy.stripe.com/test_fZu4gs4rR3S63008Kg5ZC01";

  const signOutRedirect = () => {
    const clientId = "4ba0ces3ltr96is47aq2do4b5r";
    const logoutUri = "https://main.dbrkvr6fnlyen.amplifyapp.com/";
    const cognitoDomain =
      "https://us-east-2elb5xn1wh.auth.us-east-2.amazoncognito.com";

    window.location.href =
      `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div style={{ padding: "40px", fontFamily: "Arial" }}>Loading...</div>;
  }

  if (auth.error) {
    return (
      <div style={{ padding: "40px", fontFamily: "Arial", color: "red" }}>
        Error: {auth.error.message}
      </div>
    );
  }

  if (auth.isAuthenticated) {
    return (
      <div style={{ padding: "40px", fontFamily: "Arial" }}>
        <h1>🏡 Tenant Portal</h1>
        <p>Welcome, {auth.user?.profile?.email}</p>
        <p>4830 Fiadore Ln, Castle Rock, CO 80104</p>
        <p>Monthly Rent: $3,900</p>

        <div style={{ marginTop: "20px" }}>
          <a
            href={stripePaymentLink}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              padding: "12px 20px",
              backgroundColor: "#2563eb",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              marginRight: "12px",
            }}
          >
            Pay Rent
          </a>

          <button onClick={signOutRedirect}>Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🏡 Tenant Portal</h1>
      <p>Please sign in to continue.</p>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
    </div>
  );
}

export default App;