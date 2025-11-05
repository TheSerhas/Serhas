import { type FC } from "react";
import { BooleanPill } from "@serhas/common/components";
import { useTranslation } from "react-i18next";
import { UserProp } from "@serhas/modules/users";

export const UserEnabledPill: FC<UserProp> = ({ user }) => {
    const { t } = useTranslation();
    return (
        <BooleanPill
            active={user.enabled}
            activeLabel={t('enabled')}
            inactiveLabel={t('disabled')}
        />
    )
}
