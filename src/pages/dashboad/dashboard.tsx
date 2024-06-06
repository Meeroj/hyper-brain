import Sidebar from "@/components/sidebar/sidebar";
import { Button } from "@/components/ui/button";
import { toggleSidebar } from "@/redux/slice/sidebar-toggle.slice";
import { RootState } from "@/redux/store";
import { Menu } from "lucide-react";
import { FormEvent } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { Outlet } from "react-router-dom";

// Define a typed version of the useSelector hook
const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Dashboard() {
  const { isSidebarOpen } = useTypedSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  const handleOverlayClick = (e: FormEvent) => {
    e.stopPropagation();
    dispatch(toggleSidebar());
  };

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="flex overflow-hidden h-screen">
      <Button
        className="p-2 lg:hidden absolute z-50"
        onClick={handleToggle}
        variant="outline"
      >
        <Menu className="w-6 h-6" />
      </Button>
      <span className="hidden lg:block">
        <Sidebar />
      </span>
      {isSidebarOpen && (
        <div className={`absolute lg:hidden bg-white`}>
          <div
            className="absolute h-screen w-screen z-10 bg-white bg-opacity-45 backdrop-blur-sm bg-white/30 top-0"
            onClick={handleOverlayClick}
          >
            <div
              className={`absolute shadow-md `}
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar />
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}
