import React, { useContext } from 'react';
import { 
  CiDeliveryTruck, 
  CiSettings 
} from 'react-icons/ci';
import { 
  FaRegCreditCard, 
  FaTasks, 
  FaUsers, 
  FaUsersCog,
  FaProjectDiagram,
  FaComments,
  FaUserTie,
  FaHome,
  FaCog,
  FaTachometerAlt
} from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router';
import { MdCardMembership, MdEvent, MdDashboard } from "react-icons/md";
import { GiArchiveRegister } from "react-icons/gi";
import { SiGoogletagmanager, SiKhanacademy } from 'react-icons/si';
import { BsFileEarmarkPost, BsPeople } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import useRole from '../Hooks/useRole';
import { AuthContext } from '../Context/AuthContext';

const DashboardLayout = () => {
  const { role } = useRole();
  const {user} = useContext(AuthContext)
  console.log(user)

  const navigationConfig = {
    common: [
      {
        to: "/dashboard",
        icon: <FaHome className="my-1.5 inline-block size-4" />,
        label: "Dashboard Overview",
        tip: "Dashboard"
      },
    ],
    
    // User role specific navigation
    user: [
      {
        to: "/dashboard/add-projects",
        icon: <FaProjectDiagram />,
        label: "Projects",
        tip: "View Projects"
      },
      {
        to: "/dashboard/add-testimonials",
        icon: <FaComments />,
        label: "Testimonials",
        tip: "View Testimonials"
      },
      {
        to: "/dashboard/add-team",
        icon: <FaUsers />,
        label: "Team",
        tip: "View Team"
      },
    ],
    
    // Admin role specific navigation
    admin: [
      {
        category: "Content Management",
        items: [
          {
            to: "/dashboard/admin/projects",
            icon: <FaProjectDiagram />,
            label: "Projects Section",
            tip: "Manage Projects",
            description: "Add, edit, delete project entries"
          },
          {
            to: "/dashboard/admin/testimonials",
            icon: <FaComments />,
            label: "Testimonials Section",
            tip: "Manage Testimonials",
            description: "Add, edit, delete client testimonials"
          },
          {
            to: "/dashboard/admin/team",
            icon: <FaUsers />,
            label: "Team Section",
            tip: "Manage Team",
            description: "Add, edit, delete team members"
          }
        ]
      },
    ]
  };

  /**
   * Renders the appropriate navigation items based on user role
   * @param {string} userRole - Current user's role
   * @returns {JSX.Element[]} Array of navigation items
   */
  const renderNavigation = (userRole) => {
    // Render common navigation items
    const commonNav = navigationConfig.common.map((item, index) => (
      <li key={`common-${index}`}>
        <NavLink
          to={item.to}
          className={({ isActive }) => 
            `is-drawer-close:tooltip is-drawer-close:tooltip-right 
            ${isActive ? 'bg-primary text-primary-content' : ''}`
          }
          data-tip={item.tip}
          end={item.to === "/dashboard"}
        >
          {item.icon}
          <span className="is-drawer-close:hidden">{item.label}</span>
        </NavLink>
      </li>
    ));

    // Render role-specific navigation
    let roleNav = [];
    
    if (userRole === 'user') {
      roleNav = navigationConfig.user.map((item, index) => (
        <li key={`user-${index}`}>
          <NavLink
            to={item.to}
            className={({ isActive }) => 
              `is-drawer-close:tooltip is-drawer-close:tooltip-right
              ${isActive ? 'bg-primary text-primary-content' : ''}`
            }
            data-tip={item.tip}
          >
            {item.icon}
            <span className="is-drawer-close:hidden">{item.label}</span>
          </NavLink>
        </li>
      ));
    }

    if (userRole === 'admin') {
      roleNav = navigationConfig.admin.map((category, catIndex) => (
        <React.Fragment key={`admin-cat-${catIndex}`}>
          {/* Category separator - only visible when drawer is open */}
          <li className="menu-title is-drawer-close:hidden">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              {category.category}
            </span>
          </li>
          {category.items.map((item, itemIndex) => (
            <li key={`admin-${catIndex}-${itemIndex}`}>
              <NavLink
                to={item.to}
                className={({ isActive }) => 
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right
                  ${isActive ? 'bg-primary text-primary-content' : ''}`
                }
                data-tip={item.tip}
              >
                {item.icon}
                <div className="flex flex-col is-drawer-close:hidden">
                  <span>{item.label}</span>
                  {item.description && (
                    <span className="text-xs font-normal text-gray-500">
                      {item.description}
                    </span>
                  )}
                </div>
              </NavLink>
            </li>
          ))}
          {catIndex < navigationConfig.admin.length - 1 && (
            <li className="divider is-drawer-close:hidden"></li>
          )}
        </React.Fragment>
      ));
    }

    return [...commonNav, ...roleNav];
  };

  return (
    <div className="drawer lg:drawer-open w-full mx-auto min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      {/* Main Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Navbar Header */}
        <nav className="navbar w-full bg-base-100 shadow-sm border-b border-gray-200">
          <div className="flex-none lg:hidden">
            <label 
              htmlFor="my-drawer-4" 
              aria-label="open sidebar" 
              className="btn btn-square btn-ghost"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                strokeLinejoin="round" 
                strokeLinecap="round" 
                strokeWidth="2" 
                fill="none" 
                stroke="currentColor" 
                className="size-5"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          
          <div className="flex-1 px-4">
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
            </h1>
          </div>
          
          {/* User Info  */}
          {user && (
            <div className="flex-none">
              <div className="dropdown dropdown-end btn btn-primary">
                {user.displayName || 'U'}
              </div>
            </div>
          )}
        </nav>

        {/* Page Content */}
        <div className="flex-1 p-4 md:p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>

      {/* Sidebar Drawer */}
      <div className="drawer-side z-20">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        
        <div className="flex min-h-full flex-col items-start bg-base-100 is-drawer-close:w-20 is-drawer-open:w-72 transition-all duration-300 shadow-lg">
          
          {/* Brand Logo */}
          <div className="w-full p-4 border-b border-gray-200">
            <Link 
              to={'/'} 
              className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent is-drawer-close:hidden"
            >
              Creative Hub IT
            </Link>
            <Link 
              to={'/'} 
              className="text-2xl font-bold text-purple-600 is-drawer-close:block hidden"
              title="Creative Hub IT"
            >
              CH
            </Link>
          </div>

          {/* Navigation Menu */}
          <ul className="menu w-full grow px-2 py-4 space-y-1">
            {renderNavigation(role)}
          </ul>

          {/* Footer */}
          <div className="w-full p-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 is-drawer-close:justify-center">
              <CiSettings className="size-4" />
              <span className="text-xs is-drawer-close:hidden">
                v1.0.0 | Creative Hub IT
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;