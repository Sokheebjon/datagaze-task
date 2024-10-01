import  {Suspense} from "react";
import {RouterProvider} from "react-router-dom";
import {router} from "@/pages/routes.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useTranslation} from "react-i18next";


function App() {
    const queryClient = new QueryClient();
    const {t} = useTranslation();


    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<>{t("loading")}</>}>
                <RouterProvider router={router} fallbackElement={<>Loading</>} />
            </Suspense>
        </QueryClientProvider>
  )
}

export default App
