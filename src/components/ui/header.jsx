import { useSideBarToggle } from '@/hooks/toogle';
import classNames from "classnames";
import { ButtonIcon } from './iconbuton';

const Header = () => {
    
    const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
    const sidebarToggle = () => {
        invokeToggleCollapse();
    }
    const headerStyle = classNames("bg-sidebar fixed w-full z-[99997] px-4 shadow-sm shadow-slate-500/40",
        {
            ["sm:pl-[20rem]"]: !toggleCollapse,
            ["sm:pl-[5.6rem]"]: toggleCollapse,
        });
  return (
    <header className={headerStyle}>
        <div className="h-16 flex items-center justify-between">
            <ButtonIcon onClick={sidebarToggle} /> 
            

        </div>
    </header>
  );
}
export default Header;