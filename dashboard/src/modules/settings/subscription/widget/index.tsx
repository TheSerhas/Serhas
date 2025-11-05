import {
    SectionWidget,
    Button,
} from "@serhas/common/components";
import { SubscriptionRulesForm } from "@serhas/modules/settings/subscription";
import { useTranslation } from "react-i18next";

export const SubscriptionSettingsWidget = () => {
    const { t } = useTranslation()
    return (
        <SectionWidget
            title={t("page.settings.subscription-settings.title")}
            description={t("page.settings.subscription-settings.description")}
            options={
                <Button 
                    type="submit" 
                    form="subscription-settings-form"
                >
                    {t("page.settings.subscription-settings.save-settings")}
                </Button>
            }
            content={<SubscriptionRulesForm />}
        />
    )
}
