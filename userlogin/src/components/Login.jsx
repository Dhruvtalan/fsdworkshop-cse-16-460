import { useState } from "react";
import loginIllustration from "../assets/login-illustration.png";
import "./Login.css";

// Where the backend in /server is listening (see server/server.js).
const API_BASE = "http://localhost:5000";

export default function Login() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const isSignup = mode === "signup";

  function updateField(field) {
    return (event) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  function switchMode() {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setStatus({ state: "idle", message: "" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ state: "loading", message: "" });

    const endpoint = isSignup ? "/signup" : "/login";
    const payload = isSignup
      ? form
      : { email: form.email, password: form.password };

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus({ state: "error", message: data.message || "Something went wrong." });
        return;
      }

      setStatus({ state: "success", message: data.message });
      if (isSignup) {
        // After creating the account, drop them into the login form.
        setMode("login");
        setForm({ name: "", email: form.email, password: "" });
      }
    } catch {
      setStatus({
        state: "error",
        message: "Can't reach the server. Is it running on port 5000?",
      });
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <aside className="auth-panel">
          <img src={loginIllustration} alt="" className="auth-illustration" />
          <p className="auth-panel-tagline">
            {isSignup
              ? "Create an account to pick up right where you left off."
              : "Good to see you again."}
          </p>
        </aside>

        <section className="auth-form-side">
          <div className="auth-form-wrap">
            <h1>{isSignup ? "Create your account" : "Log in"}</h1>
            <p className="auth-subtitle">
              {isSignup
                ? "It only takes a minute."
                : "Enter your details to continue."}
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {isSignup && (
                <label className="field">
                  <span>Name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={updateField("name")}
                    autoComplete="name"
                    required
                  />
                </label>
              )}

              <label className="field">
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={updateField("email")}
                  autoComplete="email"
                  required
                />
              </label>

              <label className="field">
                <span>Password</span>
                <input
                  type="password"
                  value={form.password}
                  onChange={updateField("password")}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  minLength={6}
                  required
                />
              </label>

              {status.state === "error" && (
                <p className="form-message form-message-error">{status.message}</p>
              )}
              {status.state === "success" && (
                <p className="form-message form-message-success">{status.message}</p>
              )}

              <button type="submit" disabled={status.state === "loading"}>
                {status.state === "loading"
                  ? "Please wait…"
                  : isSignup
                  ? "Create account"
                  : "Log in"}
              </button>
            </form>

            <p className="auth-toggle">
              {isSignup ? "Already have an account?" : "New here?"}{" "}
              <button type="button" className="link-button" onClick={switchMode}>
                {isSignup ? "Log in" : "Create an account"}
              </button>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}