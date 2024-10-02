import {useTranslation} from "react-i18next";
import {FormProvider, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button.tsx";
import {Form} from "@/containers";
import {LeadIcon, LockIcon, Logo, QuestionMark} from "@/assets/icons";
import {useLoginMutation} from "@/hooks";
import get from "lodash/get";
import {errorMessageEnum} from "@/utils/errorMessageConstants.ts";
import Cookies from "js-cookie";
import {accessTokenName} from "@/utils/constants.ts";
import {useNavigate} from "react-router-dom";


interface TFormValues {
    username: string;
    password: string;
}

const Login = () => {
    const {t} = useTranslation();
    const methods = useForm<TFormValues>();
    const { handleSubmit } = methods;
    const navigate = useNavigate();

    const loginMutation = useLoginMutation({
        onSuccess: (response) => {
            console.log(response, "response");
            const accessToken = get(response, "data.token");
            Cookies.set(accessTokenName, accessToken, {expires: 1});
            navigate('/');
        },
        onError: (error) => {
            const errorMessage:errorMessageEnum = get(error, "response.data.message");
            if (errorMessage === errorMessageEnum["ERROR.USER_NOT_REGISTERED"]) {
                methods.setError("username", {type: "value", message: t("error.user_not_registered")});
            }
            if (errorMessage === errorMessageEnum["ERROR.PASSWORD_NOT_MATCH"]) {
                methods.setError("password", {type: "value", message: t("error.password_not_match")});
            }
        }
    });

    const onSubmit = (value: TFormValues)=> {
        loginMutation.mutate(value);
    }


    return (
        <div className="bg-neutral-100 h-screen relative">
            <div className="flex w-full justify-between items-center absolute py-5 px-8">
                <Logo/>
                <Button className="bg-neutral-200" variant="secondary">
                    <QuestionMark/>
                    <span className="ml-1">
                        {t("button.get_support")}
                    </span>
                </Button>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-center">
                            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                                {t("login.title")}
                            </h2>
                            <p className="text-muted-foreground text-lg">{t("login.description")}</p>
                        </div>
                        <div className="flex flex-col gap-3 mt-5 justify-center items-center">
                            <Form.Input icon={<LeadIcon/>} type="text" label={t("form.login")} name="username"/>
                            <Form.Input icon={<LockIcon/>} type="password" label={t("form.password")} name="password"/>
                            <Button className="w-full" type="submit" disabled={loginMutation.isPending}>
                                {loginMutation.isPending ? t("loading") : t("button.sing_in")}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
                <p className="text-center text-muted-foreground absolute bottom-5">
                    {t("login.footer")}
                </p>
            </div>

        </div>
    )
}

export default Login;