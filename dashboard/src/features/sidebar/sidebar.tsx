import {
    Sidebar,
    type SidebarItem,
} from "@serhas/common/components";
import { useIsCurrentRoute } from "@serhas/common/hooks";
import type { FC } from "react";
import { getSidebarItems, getSidebarItemsNonSudoAdmin } from ".";
import { projectInfo, cn } from "@serhas/common/utils";
import { useAuth } from "@serhas/modules/auth";
import { SupportUs } from "@serhas/features/support-us";
import { useTranslation } from "react-i18next";

interface DashboardSidebarProps {
    collapsed: boolean;
    setCollapsed: (state: boolean) => void;
    open?: boolean;
    setOpen?: (state: boolean) => void;
}

export const DashboardSidebar: FC<DashboardSidebarProps> = ({
    collapsed,
    setCollapsed,
    setOpen,
    open,
}) => {
    const { isSudo } = useAuth();
    const { t } = useTranslation()
    const { isCurrentRouteActive } = useIsCurrentRoute()
    const sidebarItems = isSudo() ? getSidebarItems(t) : getSidebarItemsNonSudoAdmin(t)
    return (
        <aside className="size-full py-4  px-4 ">
            <nav className="size-full">
                <Sidebar
                    sidebar={sidebarItems}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    open={open}
                    setOpen={setOpen}
                >
                    <div className="flex size-full flex-col justify-between">
                        <Sidebar.Body>
                            {Object.keys(sidebarItems).map((key) => (
                                <div className="w-full" key={key}>
                                    <Sidebar.Group className="uppercase">{key}</Sidebar.Group>
                                    {sidebarItems[key].map((item: SidebarItem) => (
                                        <Sidebar.Item
                                            variant={isCurrentRouteActive(item.to) ? "active" : "default"}
                                            className={cn("my-2 border-transparent", {
                                                "w-10 h-10": collapsed,
                                            })}
                                            item={item}
                                            key={item.title}
                                        />
                                    ))}
                                </div>
                            ))}
                        </Sidebar.Body>
                        <Sidebar.Footer>
                            {collapsed ?
                                <SupportUs variant="view" donationLink={projectInfo.donationLink} structure="popover" />
                                :
                                <SupportUs variant="local-storage" donationLink={projectInfo.donationLink} structure="card" />
                            }
                        </Sidebar.Footer>
                    </div>
                </Sidebar>
            </nav>
        </aside>
    );
};
