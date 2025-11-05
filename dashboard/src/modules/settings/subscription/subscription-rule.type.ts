export type SubscriptionRuleResultType =
    "xray" | "sing-box" | "clash" | "clash-meta" | "block" | "links" | "base64-links" | "template"

export type SubscriptionRuleType = {
    pattern: string,
    result: SubscriptionRuleResultType
}

export type SubscriptionSettingsType = {
    // url_prefix: string;
    template_on_acceptance: boolean;
    profile_title: string;
    support_link: string;
    update_interval: number;
    shuffle_configs: boolean;
    placeholder_if_disabled: boolean;
    placeholder_remarks: string[];
    rules: SubscriptionRuleType[];
}
