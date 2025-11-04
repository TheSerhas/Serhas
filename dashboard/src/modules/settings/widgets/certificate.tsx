import {
    MiniWidget
} from "@serhas/common/components";
import {
    CertificateButton
} from "@serhas/modules/settings";
import { useTranslation } from "react-i18next";

export const CertificateWidget = () => {
    const { t } = useTranslation()
    return (
        <MiniWidget
            title={t("certificate")}
        >
            <CertificateButton />
        </MiniWidget>
    )
}
