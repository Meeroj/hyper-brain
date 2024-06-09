import { Brain, Layout, Library, Swords } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "@/assets/logo.png";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { ModeToggle } from "../landing/mode-toggle";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <div className="w-48 h-screen relative zoom-in-110 p-2 pr-0 font-[oswald] bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-foreground))]">
      <div className="pr-2">
        <img src={Logo} alt="Logo" className="w-full h-auto" />
        <hr className="w-full border border-amber-500 mt-2" />
      </div>
      <div className="mt-8">
        <ul>
          <li>
            <NavLink
              to="home"
              className={({ isActive }) =>
                `flex items-center p-3 text-xl pr-0 my-2 rounded-s-lg relative pe-2 ${
                  isActive
                    ? "bg-[hsl(var(--background))] text-[hsl(var(--foreground))] active-link"
                    : "hover:bg-secondary hover:text-secondary-foreground"
                }`
              }
            >
              <Layout className="mr-2" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="training"
              className={({ isActive }) =>
                `flex items-center p-3 text-xl pr-0 my-2 rounded-s-lg relative pe-2 ${
                  isActive
                    ? "bg-[hsl(var(--background))] text-[hsl(var(--foreground))] active-link"
                    : "hover:bg-secondary hover:text-secondary-foreground"
                }`
              }
            >
              <Brain className="mr-2" />
              Training
            </NavLink>
          </li>
          <li>
            <NavLink
              to="learning/home"
              className={({ isActive }) =>
                `flex items-center p-3 text-xl pr-0 my-2 rounded-s-lg relative pe-2 ${
                  isActive
                    ? "bg-[hsl(var(--background))] text-[hsl(var(--foreground))] active-link"
                    : "hover:bg-secondary hover:text-secondary-foreground"
                }`
              }
            >
              <Library className="mr-2" />
              Learning
            </NavLink>
          </li>
          <li>
            <NavLink
              to="battle"
              className={({ isActive }) =>
                `flex items-center p-3 text-xl pr-0 my-2 rounded-s-lg relative pe-2 ${
                  isActive
                    ? "bg-[hsl(var(--background))] text-[hsl(var(--foreground))] active-link"
                    : "hover:bg-secondary hover:text-secondary-foreground"
                }`
              }
            >
              <Swords className="mr-2" />
              Battle
            </NavLink>
          </li>
        </ul>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full p-2 z-50"
        id="account-setting"
      >
        <div className="flex">
          <SignedIn>
            <UserButton
              userProfileMode="modal"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8", // Customize the avatar box size
                },
              }}
            />
          </SignedIn>
          <div className="ml-2 text-[hsl(var(--sidebar-foreground))] w-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-md">{user?.username?.toUpperCase()}</p>
                <p>Online</p>
              </div>
              <ModeToggle className="bg-[hsl(var(--sidebar-bg))]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
