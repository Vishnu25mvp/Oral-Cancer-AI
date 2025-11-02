// import React, { useContext } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Home, Users, Database, Settings, LogOut } from "lucide-react";
// import { ThemeContext } from "../../context/ThemeContext";

// const Sidebar = () => {
//   const { theme, colors } = useContext(ThemeContext);
//   const location = useLocation();

//   const navItems = [
//     { name: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
//     { name: "Client", path: "/dashboard/clients", icon: <Users size={18} /> },
//     { name: "Patient Screening", path: "/dashboard/patient", icon: <Users size={18} /> },

//     { name: "Reports", path: "/dashboard/reports", icon: <Database size={18} /> },
//     { name: "Settings", path: "/dashboard/settings", icon: <Settings size={18} /> },
//   ];

//   return (
//     <aside
//       className="w-64 hidden md:flex flex-col p-4 border-r shadow-lg"
//       style={{
//         background:
//           theme === "light"
//             ? "rgba(255,255,255,0.8)"
//             : "rgba(30,41,59,0.8)",
//         borderColor: colors.border,
//       }}
//     >
//       <h2
//         className="text-xl font-bold mb-6 text-center"
//         style={{ color: colors.primary }}
//       >
//         Oral Cancer AI
//       </h2>
//       <nav className="flex flex-col gap-2">
//         {navItems.map((item) => (
//           <Link
//             key={item.name}
//             to={item.path}
//             className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all ${
//               location.pathname === item.path
//                 ? "bg-blue-600 text-white"
//                 : "hover:bg-blue-100 dark:hover:bg-slate-700"
//             }`}
//             style={{
//               color:
//                 location.pathname === item.path
//                   ? "#fff"
//                   : theme === "light"
//                   ? colors.text
//                   : colors.secondary,
//             }}
//           >
//             {item.icon} {item.name}
//           </Link>
//         ))}
//       </nav>

//       <button
//         className="mt-auto flex items-center gap-2 px-4 py-2 rounded-lg hover:text-red-500 transition"
//         onClick={() => alert("Logout clicked")}
//       >
//         <LogOut size={18} /> Logout
//       </button>
//     </aside>
//   );
// };

// export default Sidebar;


import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, Database, Settings, LogOut } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

const Sidebar = () => {
  const { theme, colors } = useContext(ThemeContext);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Load user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";

  // ✅ Define all routes first
  const allNavItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={18} />, roles: ["admin"] },
    { name: "Client", path: "/dashboard/clients", icon: <Users size={18} />, roles: ["admin"] },
    { name: "Patient Screening", path: "/dashboard/patient", icon: <Users size={18} />, roles: ["admin", "counselor"] },
    { name: "Reports", path: "/dashboard/reports", icon: <Database size={18} />, roles: ["admin", "counselor", "user"] },
    { name: "Settings", path: "/dashboard/settings", icon: <Settings size={18} />, roles: ["admin", "counselor", "user"] },
  ];

  // ✅ Filter routes by role
  const navItems = allNavItems.filter((item) => item.roles.includes(role));

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside
      className="w-64 hidden md:flex flex-col p-4 border-r shadow-lg"
      style={{
        background:
          theme === "light"
            ? "rgba(255,255,255,0.8)"
            : "rgba(30,41,59,0.8)",
        borderColor: colors.border,
      }}
    >
      {/* Header */}
      <h2
        className="text-xl font-bold mb-6 text-center"
        style={{ color: colors.primary }}
      >
        Oral Cancer AI
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-100 dark:hover:bg-slate-700"
            }`}
            style={{
              color:
                location.pathname === item.path
                  ? "#fff"
                  : theme === "light"
                  ? colors.text
                  : colors.secondary,
            }}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </nav>

      {/* Footer / Logout */}
      <button
        className="mt-auto flex items-center gap-2 px-4 py-2 rounded-lg hover:text-red-500 transition"
        onClick={handleLogout}
        style={{ color: colors.text }}
      >
        <LogOut size={18} /> Logout
      </button>

      {/* Optional Role Badge */}
      <p
        className="text-center mt-4 text-xs italic opacity-70"
        style={{ color: colors.secondary }}
      >
        Role: {role.charAt(0).toUpperCase() + role.slice(1)}
      </p>
    </aside>
  );
};

export default Sidebar;
