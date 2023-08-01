import { useSelector } from "react-redux";
import { Drawer } from "./Drawer";

export default function Navbar() {
  const keranjang = useSelector((state) => state.keranjang);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Main Course</a>
      </div>
      <div className="flex-none">
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-4"
              className="drawer-button btn btn-primary"
            >
              Keranjang
              {keranjang.length !== 0 && (
                <div className="badge">{keranjang.length}</div>
              )}
            </label>
          </div>
          <Drawer />
        </div>
      </div>
    </div>
  );
}
