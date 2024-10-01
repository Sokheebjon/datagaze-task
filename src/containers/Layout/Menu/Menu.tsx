import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

const Menu = () => {

    return (
        <NavigationMenu className="w-full">
            <NavigationMenuList className="flex flex-col w-full">
                <NavigationMenuItem className="py-3 px-2 w-full">
                   Home
                </NavigationMenuItem>
                <NavigationMenuItem>
                   Home
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Menu;