from enum import StrEnum
from typing import Pattern

from pydantic import BaseModel, validator


class ConfigTypes(StrEnum):
    links = "links"
    base64_links = "base64-links"
    xray = "xray"
    sing_box = "sing-box"
    clash = "clash"
    clash_meta = "clash-meta"
    template = "template"
    block = "block"


class SubscriptionRule(BaseModel):
    pattern: Pattern
    result: ConfigTypes


class SubscriptionSettings(BaseModel):
    template_on_acceptance: bool
    profile_title: str
    support_link: str
    update_interval: int
    shuffle_configs: bool = False
    placeholder_if_disabled: bool = True
    placeholder_remarks: list[str] = ["Your subscription is inactive. Please contact support."]
    rules: list[SubscriptionRule]

    @validator("placeholder_remarks", pre=True)
    def validate_placeholder_remarks(cls, v):
        if isinstance(v, str):
            v = [v]
        if len(v) < 1:
            raise ValueError("At least one placeholder remark is required.")
        return v


class TelegramSettings(BaseModel):
    token: str
    admin_id: list[int]
    channel_id: int | None


class Settings(BaseModel):
    subscription: SubscriptionSettings
    telegram: TelegramSettings | None
