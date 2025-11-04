import { HostType } from "@serhas/modules/hosts";
import { useQuery } from "@tanstack/react-query";
import { fetch } from "@serhas/common/utils";

export async function fetchInbound({ queryKey }: { queryKey: [string, number] }): Promise<HostType> {
    return fetch(`/inbounds/${queryKey[1]}`);
}

export const HostQueryFetchKey = "inbounds";

export const useHostQuery = ({ inboundId }: { inboundId: number }) => {
    return useQuery({
        queryKey: [HostQueryFetchKey, inboundId],
        queryFn: fetchInbound,
        initialData: undefined
    })
}
