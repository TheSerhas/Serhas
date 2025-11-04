import { ColumnDef } from "@tanstack/react-table"
import { HostType } from "@serhas/modules/hosts"
import {
    DataTableActionsCell,
    DataTableColumnHeader
} from "@serhas/libs/entity-table"
import i18n from "@serhas/features/i18n"
import {
    type ColumnActions
} from "@serhas/libs/entity-table";
import {
    NoPropogationButton,
} from "@serhas/common/components"

export const columns = (actions: ColumnActions<HostType>): ColumnDef<HostType>[] => ([
    {
        accessorKey: "remark",
        header: ({ column }) => <DataTableColumnHeader title={i18n.t('name')} column={column} />,
    },
    {
        accessorKey: "address",
        header: ({ column }) => <DataTableColumnHeader title={i18n.t('address')} column={column} />,
    },
    {
        accessorKey: "port",
        header: ({ column }) => <DataTableColumnHeader title={i18n.t('port')} column={column} />,
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <NoPropogationButton row={row} actions={actions}>
                    <DataTableActionsCell {...actions} row={row} />
                </NoPropogationButton>
            );
        },
    }
]);
