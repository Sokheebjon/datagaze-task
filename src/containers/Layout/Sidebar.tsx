import {FC} from "react";
import Header from "@/containers/Layout/Header";
import {Nav} from "@/components/ui/Nav.tsx";

interface TSidebar {
    menus: {
        title: string;
        icon: ()=> JSX.Element;
        variant: string;
        link: string;
    }[]
}

const Sidebar:FC<TSidebar> = ({menus}) => {


    return (
        <div className="bg-white">
            <div className="p-8">
                <Header/>
                <div className="mt-4">
                    <Nav
                        links={menus}
                    />
                </div>
            </div>
        </div>
    )
}

export default Sidebar;