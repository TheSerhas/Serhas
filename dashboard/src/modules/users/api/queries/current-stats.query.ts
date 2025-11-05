import { useQuery } from "@tanstack/react-query";
import { fetch } from "@serhas/common/utils";

export interface CurrentStatsResponse {
    username: string;
    
    today_new_users: number;
    today_removed_users: number;
    today_revoked_users: number;
    today_sub_updated_users: number;
    today_online_users: number;
    today_traffic_reset_users: number;

    total_users: number;
    active_users: number;
    on_hold_users: number;
    expired_users: number;
    limited_users: number;
    online_users: number;
}

export const CurrentStatsDefault: CurrentStatsResponse = {
    username: "",
    today_new_users: 0,
    today_removed_users: 0,
    today_revoked_users: 0,
    today_sub_updated_users: 0,
    today_online_users: 0,
    today_traffic_reset_users: 0,
    total_users: 0,
    active_users: 0,
    on_hold_users: 0,
    expired_users: 0,
    limited_users: 0,
    online_users: 0,
};

export async function fetchCurrentStats(): Promise<CurrentStatsResponse> {
    return await fetch(`/system/stats/current`).then((result) => {
        return result;
    });
}

export const CurrentStatsQueryFetchKey = "current-stats";

export const useCurrentStatsQuery = () => {
    return useQuery({
        queryKey: [CurrentStatsQueryFetchKey],
        queryFn: fetchCurrentStats,
        initialData: CurrentStatsDefault,
        refetchInterval: 5000, // Refresh every 5 seconds
    });
};
