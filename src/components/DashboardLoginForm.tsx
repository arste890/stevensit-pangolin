"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { createApiClient } from "@app/lib/api";
import LoginForm, { LoginFormIDP } from "@app/components/LoginForm";
import { useEnvContext } from "@app/hooks/useEnvContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cleanRedirect } from "@app/lib/cleanRedirect";
import BrandingLogo from "@app/components/BrandingLogo";
import { useTranslations } from "next-intl";
import { useLicenseStatusContext } from "@app/hooks/useLicenseStatusContext";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

type DashboardLoginFormProps = {
    redirect?: string;
    idps?: LoginFormIDP[];
    forceLogin?: boolean;
    showOrgLogin?: boolean;
    searchParams?: {
        [key: string]: string | string[] | undefined;
    };
    defaultUser?: string;
};

export default function DashboardLoginForm({
    redirect,
    idps,
    forceLogin,
    showOrgLogin,
    searchParams,
    defaultUser
}: DashboardLoginFormProps) {
    const router = useRouter();
    const { env } = useEnvContext();
    const t = useTranslations();
    const { isUnlocked } = useLicenseStatusContext();
    const initialShowLocal =
        searchParams?.local === "1" || !!defaultUser || !!forceLogin;
    const [showLocal, setShowLocal] = useState(initialShowLocal);

    function getSubtitle() {
        if (forceLogin) {
            return t("loginRequiredForDevice");
        }
        if (isUnlocked() && env.branding?.loginPage?.subtitleText) {
            return env.branding.loginPage.subtitleText;
        }
        if (idps && idps.length > 0 && !showLocal) {
            return "Choose how to sign in";
        }
        return t("loginStart");
    }

    const logoWidth = isUnlocked()
        ? env.branding.logo?.authPage?.width || 175
        : 175;
    const logoHeight = isUnlocked()
        ? env.branding.logo?.authPage?.height || 44
        : 44;

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="border-b">
                <div className="flex flex-row items-center justify-center">
                    <BrandingLogo height={logoHeight} width={logoWidth} />
                </div>
                <div className="text-center space-y-1 pt-3">
                    <p className="text-muted-foreground">{getSubtitle()}</p>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <LoginForm
                    redirect={redirect}
                    idps={idps}
                    forceLogin={forceLogin}
                    defaultEmail={defaultUser}
                    ssoFirst
                    initialShowLocal={initialShowLocal}
                    onShowLocalChange={setShowLocal}
                    onLogin={(redirectUrl) => {
                        if (redirectUrl) {
                            const safe = cleanRedirect(redirectUrl);
                            router.replace(safe);
                        } else {
                            router.replace("/");
                        }
                    }}
                />
            </CardContent>
        </Card>
    );
}
