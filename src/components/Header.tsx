import logo from "../images/learnify.png";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar w-full p-10 h-20 bg-cerulean shadow-lg fixed top-0 z-50">
      <h1 className="flex-1 font-bold text-white text-3xl">
        <img src={logo} alt="Loading" width="50" height="50" />
        Learnify
      </h1>
      <div className="flex-none">
        <ul className="flex justify-center items-center menu menu-horizontal px-1 space-x-1">
          {user ? (
            <>
              <li>{user.user_}</li>
              <li>
                <button
                  onClick={() => {
                    navigate("/");
                    logout();
                  }}
                  className="font-bold rounded-none"
                >
                  <h3 className="text-black font-bold">Logout</h3>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="text-white">Admin Database Management</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
