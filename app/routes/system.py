from datetime import datetime
from fastapi import APIRouter

from app.db import crud
from app.db.models import Admin as DBAdmin, Settings
from app.db.models import Node
from app.dependencies import (
    DBDep,
    AdminDep,
    SudoAdminDep,
    EndDateDep,
    StartDateDep,
)
from app.models.node import NodeStatus
from app.models.settings import SubscriptionSettings, TelegramSettings
from app.models.system import (
    CurrentStats,
    UsersStats,
    NodesStats,
    AdminsStats,
    TrafficUsageSeries,
)
from app.models.user import UserExpireStrategy

router = APIRouter(tags=["System"], prefix="/system")


@router.get("/settings/subscription", response_model=SubscriptionSettings)
def get_subscription_settings(db: DBDep, admin: SudoAdminDep):
    return db.query(Settings.subscription).first()[0]


@router.put("/settings/subscription", response_model=SubscriptionSettings)
def update_subscription_settings(db: DBDep, modifications: SubscriptionSettings, admin: SudoAdminDep):
    settings = db.query(Settings).first()
    settings.subscription = modifications.model_dump(mode="json")
    db.commit()
    return settings.subscription


@router.get("/settings/telegram", response_model=TelegramSettings | None)
def get_telegram_settings(db: DBDep, admin: SudoAdminDep):
    return db.query(Settings.telegram).first().telegram


@router.put("/settings/telegram", response_model=TelegramSettings | None)
def update_telegram_settings(db: DBDep, new_telegram: TelegramSettings | None, admin: SudoAdminDep):
    settings = db.query(Settings.telegram).first()
    settings.telegram = new_telegram
    db.commit()
    return settings.telegram


@router.get("/stats/admins", response_model=AdminsStats)
def get_admins_stats(db: DBDep, admin: SudoAdminDep):
    return AdminsStats(total=db.query(DBAdmin).count())


@router.get("/stats/nodes", response_model=NodesStats)
def get_nodes_stats(db: DBDep, admin: SudoAdminDep):
    return NodesStats(
        total=db.query(Node).count(),
        healthy=db.query(Node).filter(Node.status == NodeStatus.healthy).count(),
        unhealthy=db.query(Node).filter(Node.status == NodeStatus.unhealthy).count(),
    )


@router.get("/stats/traffic", response_model=TrafficUsageSeries)
def get_total_traffic_stats(db: DBDep, admin: AdminDep, start_date: StartDateDep, end_date: EndDateDep):
    return crud.get_total_usages(db, admin, start_date, end_date)


@router.get("/stats/users", response_model=UsersStats)
def get_users_stats(db: DBDep, admin: AdminDep):
    return UsersStats(
        total=crud.get_users_count(db, admin=admin if not admin.is_sudo else None),
        active=crud.get_users_count(db, admin=admin if not admin.is_sudo else None, is_active=True),
        on_hold=crud.get_users_count(
            db,
            admin=admin if not admin.is_sudo else None,
            expire_strategy=UserExpireStrategy.START_ON_FIRST_USE,
        ),
        expired=crud.get_users_count(
            db,
            admin=admin if not admin.is_sudo else None,
            expired=True,
        ),
        limited=crud.get_users_count(
            db,
            admin=admin if not admin.is_sudo else None,
            data_limit_reached=True,
        ),
        online=crud.get_users_count(db, admin=admin if not admin.is_sudo else None, online=True),
    )


@router.get("/stats/current", response_model=CurrentStats)
def get_users_stats(db: DBDep, admin: AdminDep):
    users = crud.get_users(db, admin_id=admin.id if not admin.is_sudo else None)
    today = datetime.utcnow().date()
    return CurrentStats(
        username=admin.username,
        today_new_users=sum(1 for user in users if user.created_at.date() == today),
        today_removed_users=sum(1 for user in users if user.removed and user.edit_at.date() == today),
        today_revoked_users=sum(1 for user in users if user.sub_revoked_at and user.sub_revoked_at.date() == today),
        today_sub_updated_users=sum(1 for user in users if user.sub_updated_at and user.sub_updated_at.date() == today),
        today_online_users=sum(1 for user in users if user.online_at and user.online_at.date() == today),
        today_traffic_reset_users=sum(1 for user in users if user.traffic_reset_at and user.traffic_reset_at.date() == today),
        total_users=len(users),
        active_users=sum(1 for user in users if user.is_active),
        on_hold_users=sum(1 for user in users if user.expire_strategy == UserExpireStrategy.START_ON_FIRST_USE),
        expired_users=sum(1 for user in users if user.expired),
        limited_users=sum(1 for user in users if user.data_limit_reached),
        online_users=sum(1 for user in users if user.online),
    )
