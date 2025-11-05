import { UserType } from "@serhas/modules/users";

export interface NodesUsage {
    datetime: Date;
    nodes: Record<string, number>;
}

export interface UserNodesUsageWidgetProps {
    user: UserType;
}
