import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authApi from "../../api/authApi";
import logo from "../../assets/images/logo.png";
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
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          {/* Left Column */}
          <div className="col-sm-6 text-black">
            <div className="px-5 ms-xl-4 d-flex align-items-center">
              <img 
                src={logo} 
                alt="Logo" 
                className="me-3 pt-5 mt-xl-4" 
                style={{ height: "50px", objectFit: "contain" }} 
              />
              <span className="h1 fw-bold mb-0">EAST Facilities</span>
            </div>

            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: "23rem" }} onSubmit={handleSubmit}>
                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                  Log in
                </h3>

                {error && <p className="text-danger small mb-4">{error}</p>}

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form2Example18"
                    name="email"
                    className="form-control form-control-lg"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label" htmlFor="form2Example18">
                    Email address
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example28"
                    name="password"
                    className="form-control form-control-lg"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label" htmlFor="form2Example28">
                    Password
                  </label>
                </div>

                <div className="pt-1 mb-4">
                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-info btn-lg btn-block"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>

                <p className="small mb-5 pb-lg-2">
                  <Link to="/forgot-password" className="text-muted">
                    Forgot password?
                  </Link>
                </p>

                {/* Social Login Buttons */}
                <div className="d-flex mb-4">
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
                  <Link to="/register" className="link-info">
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
              alt="Login"
              className="w-100 vh-100"
              style={{ objectFit: "cover", objectPosition: "left" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
