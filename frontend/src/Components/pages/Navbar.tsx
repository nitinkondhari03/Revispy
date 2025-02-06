import { IoIosSearch } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";


const Navbar = () => {
   const {user, fetchUsers } = useAuth();
 
  const handlelogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res=await axios.get("http://localhost:8080/api/logout");
      localStorage.removeItem("token");
      alert("Logout successful.");
      fetchUsers()
    } catch (error) {
        alert("Something went wrong!");
    }
  };
  return (
     <>
          <header className="w-full bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-end items-end text-right">
              <div className="hidden md:flex gap-4">
                <a className="text-gray-600 hover:text-black">
                  Help
                </a>
                <a  className="text-gray-600 hover:text-black">
                  Orders & Returns
                </a>
                <a  className="text-gray-600 hover:text-black">
                  Hi, John
                </a>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
              {/* Logo */}
              <h1 className="text-xl font-bold">ECOMMERCE</h1>
    
              {/* Navigation Links */}
              <nav className="hidden md:flex gap-4">
                <a className="text-gray-600 hover:text-black">
                  Categories
                </a>
                <a className="text-gray-600 hover:text-black">
                  Sale
                </a>
                <a className="text-gray-600 hover:text-black">
                  Clearance
                </a>
                <a className="text-gray-600 hover:text-black">
                  New stock
                </a>
                <a className="text-gray-600 hover:text-black">
                  Trending
                </a>
              </nav>
    
              {/* Right-side Links */}
              <div className="hidden md:flex gap-6">
                <a>
                 <IoIosSearch className="size-7"/>
                </a>
                <a >
                 <BsCart2 className="size-7"/>
                </a>
                {/* <Link to={"/emailverification"}>Email Verify</Link> */}
                {user?.name &&
                <button onClick={handlelogout}>
                 Logout
                </button>}
              </div>
    
              {/* Mobile Menu Button */}
              <div className="flex items-center gap-2 md:hidden">
                <button className="text-gray-600">Menu</button>
              </div>
            </div>
    
            {/* Banner */}
            <div className="w-full bg-gray-200 text-center py-2">
              <p className="text-sm">Get 10% off on business sign up</p>
            </div>
          </header>
        </>
  )
}

export default Navbar