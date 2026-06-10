import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, User, Lock, Trophy } from "lucide-react";
import { memberLogin } from "@/services/authService";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    urnNumber: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!formData.urnNumber || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (formData.urnNumber.length < 3) {
      setError("Please enter a valid URN number");
      setIsLoading(false);
      return;
    }

    try {
      const response = await memberLogin({
        urn: formData.urnNumber,
        password: formData.password,
      });

      if (response.status === 200) {
        Cookies.set("accessToken", response.data.accessToken);
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        throw response;
      }
    } catch (err) {
      console.error("Login error:", err);
      let errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-8">
      <Card className="w-full max-w-md bg-[#1a1f3a] shadow-2xl border-2 border-[#f59e0b]">
        <CardHeader className="text-center space-y-2 bg-gradient-to-br from-[#0a0e27] to-[#1a1f3a] rounded-t-xl">
          <div className="mx-auto flex items-center justify-center mb-4">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="Prempuri Cricket League Logo" 
                width={120} 
                height={120} 
                className="ring-4 ring-[#f59e0b] rounded-full" 
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-[#f59e0b] to-[#dc2626] rounded-full flex items-center justify-center shadow-lg">
                <Trophy className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to your PCL account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-[#dc2626]/20 border-[#dc2626] text-white">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="urnNumber"
                className="text-sm font-medium text-white"
              >
                URN Number
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#f59e0b] h-4 w-4" />
                <Input
                  id="urnNumber"
                  name="urnNumber"
                  type="text"
                  placeholder="Enter your URN number"
                  value={formData.urnNumber}
                  onChange={handleInputChange}
                  className="pl-10 h-11 bg-[#0a0e27] border-2 border-[#f59e0b]/30 focus:border-[#f59e0b] text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-white"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#f59e0b] h-4 w-4" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 h-11 bg-[#0a0e27] border-2 border-[#f59e0b]/30 focus:border-[#f59e0b] text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#f59e0b] hover:text-[#dc2626]"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#f59e0b] to-[#dc2626] hover:from-[#dc2626] hover:to-[#f59e0b] text-white transition-all shadow-lg"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <Trophy className="w-4 h-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400">
              🏏 <span className="font-semibold text-white">Prempuri Cricket League</span> - Where Champions Are Made
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
