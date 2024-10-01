import {BellIcon, Logo} from "@/assets/icons";
import {Button} from "@/components/ui/button.tsx";
import {useTranslation} from "react-i18next";

const Header = () => {
    const {t} = useTranslation()

    return (
        <div className="flex justify-between items-start border-b pb-6 border-dashed border-gray-300">
            <div className="flex">
                <Logo/>
                <div className="ml-3">
                    <p className="font-semibold">{t("layout.brand_name")}</p>
                    <p className="text-gray-500 text-sm">{t("layout.version")}</p>
                </div>
            </div>
            <Button variant="ghost" className="px-2 py-2">
                <BellIcon/>
            </Button>
        </div>
    )
}

export default Header;