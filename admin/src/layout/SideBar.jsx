import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBox, FaTags, FaSortUp } from "react-icons/fa";
import {
  MdAdminPanelSettings,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md"; // Icons for arrow

function SideBar() {
  const [isProductOpen, setIsProductOpen] = useState(false);

  const toggleProductMenu = () => {
    setIsProductOpen(!isProductOpen);
  };

  return (
    <div className="w-[200px] bg-[var(--sidebar-bg)] text-white h-auto flex flex-col gap-8">
      <div className="border-b h-[80px]">
        <div className="flex items-center gap-2 p-4">
          <MdAdminPanelSettings size={30} />
          <h1 className="text-xl font-bold">پنل ادمین</h1>
        </div>
      </div>
      <ul className="flex flex-col gap-4 p-4">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink"
            }
          >
            <FaHome /> داشبورد
          </NavLink>
        </li>
        <li>
          <div
            className={`navlink cursor-pointer flex justify-between `}
            onClick={toggleProductMenu}
          >
            <div className="flex items-center gap-2">
              <FaBox /> محصولات
            </div>
            {isProductOpen ? <MdExpandLess /> : <MdExpandMore />}
          </div>
          {/* Submenu with smoother transition */}
          <ul
            className={`transition-all  duration-500 ease-in-out overflow-hidden text-xs   ${
              isProductOpen ? "h-40 opacity-100 mt-2 " : "h-0 opacity-0"
            }`}
          >
            <li>
              <NavLink
                to="/admin/product/add"
                className={({ isActive }) =>
                  isActive ? "navlink-active mr-2" : "navlink mr-2"
                }
              >
                <FaSortUp />
                اضافه کردن محصول
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/product/edit"
                className={({ isActive }) =>
                  isActive ? "navlink-active mr-2" : "navlink mr-2"
                }
              >
                <FaSortUp />
                ویرایش محصول
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to="/admin/category"
            className={({ isActive }) =>
              isActive ? "navlink-active" : "navlink"
            }
          >
            <FaTags /> دسته بندی ها
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
