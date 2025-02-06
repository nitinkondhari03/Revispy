import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: any;
  fetchUsers: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/profile", {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data);
        if (res.data) {
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Not authenticated");
        navigate("/login");
      }
    };
    fetchUser();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/profile", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data);
      if (res.data) {
        navigate("/");
      } else {
        setUser(null)
        navigate("/login");
      }
    } catch (error) {
      setUser(null)
      console.error("Not authenticated");
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user,fetchUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
