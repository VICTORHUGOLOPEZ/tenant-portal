import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

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
        <button onClick={signOutRedirect}>Sign out</button>
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