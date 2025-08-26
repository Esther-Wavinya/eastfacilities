import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authApi from "../../api/authApi";
import logo from "../../assets/images/logo.png";
import image2 from "../../assets/images/image 2.jpg";
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const res = await authApi.login(form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
  };

  return (
    <section
      className="text-center text-lg-start"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #23416b 60%, #f4992a 100%)",
        display: "flex",
        alignItems: "center"
      }}
    >
      <style>
        {`
          .cascading-right {
            margin-right: -50px;
          }
          @media (max-width: 991.98px) {
            .cascading-right {
              margin-right: 0;
            }
          }
        `}
      </style>

      <div className="container py-4">
        <div className="row g-0 align-items-center">
          
          {/* Left Column (Card with form) */}
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div 
              className="card cascading-right bg-white"
              style={{
                backdropFilter: "blur(30px)",
                borderRadius: "1rem",
                border: "4px solid #f4992a"
              }}
            >
              <div className="card-body p-5 shadow-5 text-center">
                <div className="mb-4">
                  <img 
                    src={logo} 
                    alt="Logo" 
                    style={{ height: "100px", objectFit: "contain" }}
                  />
                </div>

                <h3 className="fw-bold mb-4" style={{ color: "#23416b" }}>EAST Facilities</h3>

                {error && <p className="text-danger small mb-4">{error}</p>}

                <form style={{ maxWidth: "23rem", margin: "0 auto" }} onSubmit={handleSubmit}>
                  {/* Email input */}
                  <div className="form-outline mb-4 text-start">
                    <label className="form-label" htmlFor="form2Example18">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="form2Example18"
                      name="email"
                      className="form-control form-control-lg"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Password input */}
                  <div className="form-outline mb-4 text-start">
                    <label className="form-label" htmlFor="form2Example28">
                      Password
                    </label>
                    <input
                      type="password"
                      id="form2Example28"
                      name="password"
                      className="form-control form-control-lg"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-lg w-100 d-flex justify-content-center align-items-center"
                      type="submit"
                      disabled={loading}
                      style={{
                        backgroundColor: "#f4992a",
                        color: "#fff",
                        border: "none",
                        fontWeight: "600"
                      }}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </div>

                  <p className="small mb-4">
                    <Link to="/forgot-password" className="text-muted">
                      Forgot password?
                    </Link>
                  </p>

                  {/* Social Login Buttons */}
                  <div className="d-flex justify-content-center mb-4">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin("google")}
                      className="btn btn-outline-secondary rounded-circle me-2"
                    >
                      <FaGoogle />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialLogin("facebook")}
                      className="btn btn-outline-secondary rounded-circle me-2"
                    >
                      <FaFacebookF />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialLogin("apple")}
                      className="btn btn-outline-secondary rounded-circle"
                    >
                      <FaApple />
                    </button>
                  </div>

                  <p>
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: "#23416b", fontWeight: "600" }}>
                      Register here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="col-lg-6 mb-5 mb-lg-0">
            <img
              src={image2}
              className="w-100 rounded-4 shadow-4"
              alt="Login illustration"
              style={{ objectFit: "cover", height: "100%", minHeight: "400px", borderRadius: "1rem" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
