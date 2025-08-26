import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authApi from "../../api/authApi";
import { useAuth } from "../../context/AuthProvider.jsx";
import logo from "../../assets/images/Logo.png";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithFacebook, loginWithApple, loadingSDK } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
      setLoading(true);
      setError("");
      const res = await authApi.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      setError("");
      let tokenResponse;
      if (provider === "google") tokenResponse = await loginWithGoogle();
      if (provider === "facebook") tokenResponse = await loginWithFacebook();
      if (provider === "apple") tokenResponse = await loginWithApple();

      // Ensure token is stored (AuthProvider should handle this, but extra safety)
      if (tokenResponse?.token) {
        localStorage.setItem("token", tokenResponse.token);
      }
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Social login failed");
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <style>{`
        .background-radial-gradient {
          background-color: #23416b;
          background-image: radial-gradient(650px circle at 0% 0%,
              #f4992a 15%,
              #23416b 40%,
              #23416b 75%,
              transparent 100%),
            radial-gradient(1250px circle at 100% 100%,
              #f4992a 15%,
              #23416b 40%,
              #23416b 75%,
              transparent 100%);
        }
        #radius-shape-1 {
          height: 220px;
          width: 220px;
          top: -60px;
          left: -130px;
          background: radial-gradient(#f4992a, #23416b);
          overflow: hidden;
        }
        #radius-shape-2 {
          border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
          bottom: -60px;
          right: -110px;
          width: 300px;
          height: 300px;
          background: radial-gradient(#f4992a, #23416b);
          overflow: hidden;
        }
        .bg-glass {
          background-color: rgba(255, 255, 255, 0.92) !important;
          backdrop-filter: saturate(200%) blur(25px);
          border: 3px solid #f4992a;
          border-radius: 1rem;
        }
        .btn-primary {
          background-color: #f4992a !important;
          border: none !important;
          font-weight: 600;
        }
        .btn-primary:disabled {
          opacity: 0.7;
        }
        .form-label {
          color: #23416b;
          font-weight: 500;
        }
        .text-primary {
          color: #23416b !important;
          font-weight: 600;
        }
      `}</style>

      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <div className="mb-4">
              <img 
                src={logo} 
                alt="Logo" 
                style={{ height: "50px", objectFit: "contain" }}
              />
            </div>
            <h1 className="my-5 display-8 fw-bold ls-tight" style={{ color: "#fff" }}>
              Book EAST Facilities
            </h1>
            <p className="mb-4 opacity-75" style={{ color: "#f4992a" }}>
              Perfect Venue for Weddings, Conferences, Team Building, Photoshoots, On-site Accommodation and More
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>                  
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="remember" />
                    <label className="form-check-label" htmlFor="remember">Remember me</label>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                    {loading ? "Signing up..." : "Sign up"}
                  </button>

                  <div className="text-center mb-3" style={{ color: "#23416b" }}>or sign up with:</div>
                  <div className="d-flex justify-content-center mb-4">
                    <button 
                      type="button" 
                      onClick={() => handleSocialLogin("google")} 
                      className="btn btn-light mx-1" 
                      disabled={loadingSDK}
                    >
                      <FaGoogle />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleSocialLogin("facebook")} 
                      className="btn btn-light mx-1" 
                      disabled={loadingSDK}
                    >
                      <FaFacebookF />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleSocialLogin("apple")} 
                      className="btn btn-light mx-1" 
                      disabled={loadingSDK}
                    >
                      <FaApple />
                    </button>
                  </div>

                  <p className="text-center">
                    Have an account? <Link to="/login" className="text-primary">Login</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
