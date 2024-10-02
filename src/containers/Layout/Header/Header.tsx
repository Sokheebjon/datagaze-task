import {Logo} from "@/assets/icons";
import {useTranslation} from "react-i18next";
import Notification from "@/containers/Layout/Header/Notification.tsx";

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
            <Notification/>
        </div>
    )
}

export default Header;