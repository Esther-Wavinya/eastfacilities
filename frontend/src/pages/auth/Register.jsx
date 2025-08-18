import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authApi from "../../api/authApi"; // your API wrapper
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
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
        password: form.password
      });
      // Store token if needed
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-green-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Create an Account?</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <div className="flex items-center mb-4">
          <input type="checkbox" id="remember" className="mr-2" />
          <label htmlFor="remember" className="text-sm">Remember me</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-full transition"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>

        <p className="text-center my-4 text-gray-500">Or Log in with</p>
        <div className="flex justify-center space-x-4">
          <button type="button" onClick={() => handleSocialLogin("google")} className="p-3 bg-gray-100 rounded-full">
            <FaGoogle size={20} />
          </button>
          <button type="button" onClick={() => handleSocialLogin("facebook")} className="p-3 bg-gray-100 rounded-full">
            <FaFacebookF size={20} />
          </button>
          <button type="button" onClick={() => handleSocialLogin("apple")} className="p-3 bg-gray-100 rounded-full">
            <FaApple size={20} />
          </button>
        </div>

        <p className="text-center mt-6 text-sm">
          Didn’t have an account? <Link to="/login" className="text-green-500 font-semibold">Login</Link>
        </p>
      </form>
    </div>
  );
}
