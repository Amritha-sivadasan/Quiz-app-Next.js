import Link from "next/link";
import { useState } from "react";
import { CgMenuGridO } from "react-icons/cg";

const UserMenu = () => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const useMenuHandler = () => {
    setOpenUserMenu(!openUserMenu);
  };

  const links = [
    { name: "Stats", path: "/stats" },
    { name: "Leaderboards", path: "/leaderboards" },
  ];

  return (
    <div
      className="text-xl mt-1 cursor-pointer p-2"
      onMouseEnter={() => setOpenUserMenu(true)}
      onMouseLeave={() => setOpenUserMenu(false)}
    >
      <div className="relative ">
        {" "}
        <CgMenuGridO />
        {openUserMenu && (
          <ul className="absolute bg-white border z-[99] top-7 sm:left-[-50px] left-[70px] p-3  text-sm rounded-md ">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                onClick={() => setOpenUserMenu(false)}
              >
                <li className="hover:underline pb-3 box-border">{link.name}</li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
