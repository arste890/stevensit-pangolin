import { Separator } from "@app/components/ui/separator";
import { priv } from "@app/lib/api";
import { pullEnv } from "@app/lib/pullEnv";
import { build } from "@server/build";
import { GetLicenseStatusResponse } from "@server/routers/license/types";
import { AxiosResponse } from "axios";
import { getTranslations } from "next-intl/server";
import { cache } from "react";

export default async function AuthFooter() {
    const env = pullEnv();
    const t = await getTranslations();

    let hideFooter = false;
    let licenseStatus: GetLicenseStatusResponse | null = null;

    if (build === "enterprise") {
        const licenseStatusRes = await cache(
            async () =>
                await priv.get<AxiosResponse<GetLicenseStatusResponse>>(
                    "/license/status"
                )
        )();
        licenseStatus = licenseStatusRes.data.data;
        if (
            env.branding.hideAuthLayoutFooter &&
            licenseStatusRes.data.data.isHostLicensed &&
            licenseStatusRes.data.data.isLicenseValid &&
            licenseStatusRes.data.data.tier !== "personal"
        ) {
            hideFooter = true;
        }
    }

    if (hideFooter) return null;

    return (
        <footer className="hidden md:block w-full mt-12 py-3 mb-6 px-4">
            <div className="container mx-auto flex flex-wrap justify-center items-center h-3 space-x-4 text-xs text-neutral-400 dark:text-neutral-600">
                <span className="whitespace-nowrap">
                    © {new Date().getFullYear()} StevensIT
                </span>
                <Separator orientation="vertical" />
                <a
                    href="https://github.com/arste890/stevensit-pangolin#readme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap"
                >
                    License and source
                </a>
                {build === "enterprise" &&
                licenseStatus?.isHostLicensed &&
                licenseStatus?.isLicenseValid &&
                licenseStatus?.tier === "personal" ? (
                    <>
                        <Separator orientation="vertical" />
                        <span>{t("personalUseOnly")}</span>
                    </>
                ) : null}
                {build === "enterprise" &&
                (!licenseStatus?.isHostLicensed ||
                    !licenseStatus?.isLicenseValid) ? (
                    <>
                        <Separator orientation="vertical" />
                        <span>{t("unlicensed")}</span>
                    </>
                ) : null}
                {build === "saas" && (
                    <>
                        <Separator orientation="vertical" />
                        <a
                            href="https://pangolin.net/tos"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="flex items-center space-x-2 whitespace-nowrap"
                        >
                            <span>{t("termsOfService")}</span>
                        </a>
                        <Separator orientation="vertical" />
                        <a
                            href="https://pangolin.net/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="flex items-center space-x-2 whitespace-nowrap"
                        >
                            <span>{t("privacyPolicy")}</span>
                        </a>
                    </>
                )}
            </div>
        </footer>
    );
}
