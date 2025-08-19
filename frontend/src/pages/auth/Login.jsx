import { useState } from "react";
import { useNavigate, Link, Form } from "react-router-dom";
import authApi from "../../api/authApi";
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
    <form class="row row-cols-lg-auto g-3 align-items-center" onSubmit={handleSubmit}>
      <div class="col-12">
        <h2 className="text-2xl font-semibold text-center mb-6">Welcome to EAST Facilities</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      </div>   
      <div class="col-12">
        <label for="inputEmail4" class="form-label">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>   
      <div class="col-12">
        <label for="inputPassword4" class="form-label">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>
      <div class="row g-3">
        <div class="col-auto">
          <div class="form-check" >
            <input class="form-check-input" type="checkbox" id="autoSizingChcek2" />
            <label class="form-check-label" for="autoSizingCheck2">Remember me</label>
         </div>
        </div>
        <div class="col-auto">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
      </div>
      <div className="row g-3">
        <button
          type="submit"
          disabled={loading}
          onClick={() => {
            if (!loading) {
              // just a visual shortcut — handleSubmit will do real navigation
              navigate("/dashboard");
            }
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
      <div class="row g-3">
        <div class="col-auto">
          <button type="button" onClick={() => handleSocialLogin("google")} className="p-3 bg-gray-100 rounded-full">
            <FaGoogle size={20} />
          </button>
        </div>
        <div class="col-auto">
          <button type="button" onClick={() => handleSocialLogin("facebook")} className="p-3 bg-gray-100 rounded-full">
            <FaFacebookF size={20} />
          </button>
        </div>
        <div class="col-auto">
          <button type="button" onClick={() => handleSocialLogin("apple")} className="p-3 bg-gray-100 rounded-full">
            <FaApple size={20} />
          </button>
        </div>
      </div>
      <div class="row g-3">
        <div class="col-auto">
          <p>Don't have an account?</p>
        </div>
        <div class="col-auto">
          <Link to="/register" className="text-green-500 font-semibold">Create an account</Link>
        </div>
      </div>

    </form>
  );
}
