import {FC, useCallback, useMemo} from "react";
import Header from "@/containers/Layout/Header";
import {Nav} from "@/components/ui/Nav.tsx";
import {GlobusIcon, LogoutIcon, ThemeIcon} from "@/assets/icons";
import {useTranslation} from "react-i18next";
import {Switch} from "@/components/ui/switch.tsx";
import Select from "@/components/Select";
import {accessTokenName, DEFAULT_LANGUAGE} from "@/utils/constants.ts";
import {Button} from "@/components/ui/button.tsx";
import Cookies from "js-cookie";

interface TSidebar {
    menus: {
        title: string;
        icon: () => JSX.Element;
        variant: string;
        link: string;
    }[]
}

const Sidebar: FC<TSidebar> = ({menus}) => {
    const {t, i18n} = useTranslation();
    const defaultLanguage = localStorage.getItem("i18nextLng") ?? DEFAULT_LANGUAGE

    const languageOptions = useMemo(() => [
        {value: 'en', label: t("language.english")},
        {value: 'uz', label: t("language.uzbek")},
        {value: 'ru', label: t("language.russian")},
    ], [t])

    const handleChangeSelect = useCallback((value: string) => {
        localStorage.setItem("i18nextLng", value)
        i18n.changeLanguage(value)
    }, [i18n])

    const handleLogOut = useCallback(() => {
        Cookies.remove(accessTokenName)
        window.location.reload()
    }, [])


    return (
        <div className="bg-white text-gray-600 relative w-[340px] max-h-screen overflow-hidden">
            <div className="p-8 flex flex-col justify-between h-full">
                <div>
                    <Header/>
                    <div className="mt-4">
                        <Nav links={menus}/>
                    </div>
                </div>
                <div className="bottom-2">
                    <ul className="flex flex-col gap-4">
                        <li className="flex justify-between gap-2">
                            <div className="flex gap-2 items-center">
                                <ThemeIcon/>
                                {t("sidebar.dark_theme")}
                            </div>
                            <Switch disabled={true}/>
                        </li>
                        <li className="flex justify-between gap-2">
                            <div className="flex gap-2 items-center">
                                <GlobusIcon/>
                                {t("sidebar.language")}
                            </div>
                            <div>
                                <Select
                                    onValueChange={handleChangeSelect}
                                    defaultValue={defaultLanguage}
                                    options={languageOptions}
                                />
                            </div>
                        </li>
                        <li className="flex justify-between gap-2">
                            <Button onClick={handleLogOut} variant="ghost" className="flex gap-2 items-center pl-0">
                                <LogoutIcon/>
                                {t("sidebar.logout")}
                            </Button>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;