import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const stripePaymentLink = "https://buy.stripe.com/test_fZu4gs4rR3S63008Kg5ZC01";
  const apiUrl =
    "https://z45s9wov3k.execute-api.us-east-2.amazonaws.com/prod/tenant-dashboard";

  const [dashboardData, setDashboardData] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [dashboardError, setDashboardError] = useState("");

  const signOutRedirect = async () => {
    const clientId = "4ba0ces3ltr96is47aq2do4b5r";
    const logoutUri = "https://main.dbrkvr6fnlyen.amplifyapp.com/";
    const cognitoDomain =
      "https://us-east-2elb5xn1wh.auth.us-east-2.amazoncognito.com";

    try {
      await auth.removeUser();
    } catch (error) {
      console.error("Error removing local user:", error);
    }

    const logoutUrl =
      `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;

    window.location.assign(logoutUrl);
  };

  useEffect(() => {
    if (!auth.isAuthenticated) return;

    const fetchDashboard = async () => {
      setLoadingDashboard(true);
      setDashboardError("");

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();
        const parsedBody =
          typeof result.body === "string" ? JSON.parse(result.body) : result.body ?? result;

        setDashboardData(parsedBody);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        setDashboardError("Unable to load dashboard data.");
      } finally {
        setLoadingDashboard(false);
      }
    };

    fetchDashboard();
  }, [auth.isAuthenticated]);

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
      <div
        style={{
          padding: "40px",
          fontFamily: "Arial",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1>🏡 Tenant Portal</h1>
        <p>Welcome, {auth.user?.profile?.email}</p>

        {loadingDashboard && <p>Loading dashboard data...</p>}
        {dashboardError && <p style={{ color: "red" }}>{dashboardError}</p>}

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "20px",
            marginTop: "20px",
            marginBottom: "20px",
            backgroundColor: "#f9fafb",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Property Information</h2>
          <p>
            <strong>Address:</strong>{" "}
            {dashboardData?.address || "Loading..."}
          </p>
          <p>
            <strong>Monthly Rent:</strong>{" "}
            {dashboardData ? `$${dashboardData.monthlyRent}` : "Loading..."}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {dashboardData ? `${dashboardData.dueDay}st of every month` : "Loading..."}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {dashboardData?.paymentStatus || "Loading..."}
          </p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            backgroundColor: "#ffffff",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Payment Actions</h2>
          <p>Use the button below to submit your monthly rent payment securely.</p>

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

          <button
            onClick={signOutRedirect}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "20px",
            backgroundColor: "#fff7ed",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Reminder</h2>
          <p>
            Don’t forget: your monthly rent payment is due soon.
          </p>
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