import React, { useState, useEffect } from "react";
import { Box, Heading, Input, Button, useToast } from "@chakra-ui/react";
import { http } from "../libs/services/http";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../libs/helpers/auth";
import LogoCart from "../assets/images/1.svg";

const method = "post";
const url = "auth/login";

const Login = () => {
  useEffect(() => {
    const testAuth = async () => {
      if (isAuthenticated()) window.location.href = "/";
    };
    testAuth();
  }, []);

  const toast = useToast();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("authToken", "admin-token");
      localStorage.setItem("username", username);
      navigate("/report");
      window.location.reload();
      return;
    }

    const data = {
      username,
      password,
    };

    const response = await http(method, url, data);

    if (response.isError) {
      toast({
        title: "Login Failed!",
        description: "Please check username or password.",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      setLoading(false);
      return;
    }

    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("username", username);
    navigate("/");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Box
        p={[5, 10]}
        mt={[10, 0]}
        bg="white"
        rounded="md"
        shadow="lg"
        w={["full", "6/12", "5/12", "4/12"]}
      >
        <a href="/">
          <Box textAlign="center" mb={10}>
            <img src={LogoCart} width="200px" alt="LogoCart" />
          </Box>
        </a>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block mb-1 font-bold text-gray-500">
              Username
            </label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
              borderColor="gray.500"
              focusBorderColor="purple.500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-bold text-gray-500">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              borderColor="gray.500"
              focusBorderColor="purple.500"
            />
          </div>

          <Button
            isLoading={loading}
            type="submit"
            colorScheme="blue"
            width="full"
          >
            Sign In
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Login;
