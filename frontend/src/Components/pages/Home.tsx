import { useAuth } from "../context/AuthContext";

export const Home = () => {
  const { user } = useAuth();
  console.log(user)
  return (
    <div>
    <h2>Welcome, {user?.name}</h2>
    <button >Logout</button>
  </div>
  )
}
