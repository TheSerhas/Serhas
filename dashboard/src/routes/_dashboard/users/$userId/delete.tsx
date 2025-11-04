import {
    createFileRoute,
    useNavigate,
} from "@tanstack/react-router";
import {
    UsersDeleteConfirmationDialog,
    useRouterUserContext,
} from "@serhas/modules/users";
import { useDialog } from "@serhas/common/hooks";

const UserDelete = () => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useDialog(true);
    const value = useRouterUserContext()
    const navigate = useNavigate({ from: "/users/$userId/delete" });

    return !!(value?.user) && (
        <UsersDeleteConfirmationDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            entity={value.user}
            onClose={() => navigate({ to: "/users" })}
        />
    );
}

export const Route = createFileRoute('/_dashboard/users/$userId/delete')({
    component: UserDelete,
})
