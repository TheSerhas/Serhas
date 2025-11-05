import {
    Button,
    FormField,
    FormItem,
    Input,
    FormControl,
    Sortable,
    SortableItem,
    SortableDragHandle,
    DeleteConfirmation,
    ScrollArea,
    Separator,
    HStack,
} from "@serhas/common/components";
import { TrashIcon, Plus, RotateCcw } from 'lucide-react';
import { useFormContext, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Schema } from "../schema";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { useDialog } from "@serhas/common/hooks";
import { useCallback } from "react";

interface PlaceholderRemarkItemProps {
    index: number;
    fieldId: string;
    onRemove: (index: number) => void;
    isOnlyOne: boolean;
}

const PlaceholderRemarkItem = ({ index, fieldId, onRemove, isOnlyOne }: PlaceholderRemarkItemProps) => {
    const form = useFormContext<Schema>();
    const [deleteDialogOpen, setDeleteDialogOpen] = useDialog(false);

    return (
        <>
            <DeleteConfirmation
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                action={() => onRemove(index)}
            />
            <SortableItem value={fieldId} asChild>
                <div className="grid grid-cols-[1fr,auto,auto] items-center gap-2 my-2">
                    <FormField
                        control={form.control}
                        name={`placeholder_remarks.${index}`}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        className="h-8" 
                                        placeholder="Enter placeholder remark..." 
                                        {...field} 
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <SortableDragHandle
                        variant="outline"
                        size="icon"
                        className="size-8 shrink-0"
                    >
                        <DragHandleDots2Icon
                            className="size-4"
                            aria-hidden="true"
                        />
                    </SortableDragHandle>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-8 shrink-0"
                        onClick={() => setDeleteDialogOpen(true)}
                        disabled={isOnlyOne}
                        title={isOnlyOne ? "At least one placeholder remark is required" : "Remove placeholder"}
                    >
                        <TrashIcon
                            className="size-4 text-destructive"
                            aria-hidden="true"
                        />
                        <span className="sr-only">Remove</span>
                    </Button>
                </div>
            </SortableItem>
        </>
    );
};

export const PlaceholderRemarksField = ({ initialData }: { initialData?: string[] }) => {
    const { t } = useTranslation();
    const form = useFormContext<Schema>();
    // @ts-ignore - TypeScript doesn't properly infer placeholder_remarks field
    const { fields, append, remove, move } = useFieldArray({
        control: form.control,
        name: "placeholder_remarks" as any,
    });

    const handleAddRemark = () => {
        append("Your subscription is inactive. Please contact support.");
    };

    const handleResetPlaceholders = useCallback(() => {
        if (initialData) {
            form.setValue("placeholder_remarks", initialData);
        }
    }, [form, initialData]);

    return (
        <>
            <Separator className="my-3" />
            <h4 className="text-lg mt-2">
                {t("page.settings.subscription-settings.placeholder-title")}
            </h4>
            <p className="text-sm text-muted-foreground">
                {t("page.settings.subscription-settings.placeholder-desc")}
            </p>
            
            <div className="space-y-1">
                <Sortable
                    value={fields}
                    onMove={({ activeIndex, overIndex }) =>
                        move(activeIndex, overIndex)
                    }
                >
                    <ScrollArea className="flex flex-col w-full max-h-[300px] gap-2" type="always">
                        {fields.map((field, index) => (
                            <PlaceholderRemarkItem
                                key={field.id}
                                index={index}
                                fieldId={field.id}
                                onRemove={remove}
                                isOnlyOne={fields.length === 1}
                            />
                        ))}
                    </ScrollArea>
                </Sortable>
            </div>

            <HStack className="w-full flex-end mt-2">
                <Button
                    type="button"
                    variant="outline"
                    className="w-fit"
                    onMouseDown={handleResetPlaceholders}
                >
                    <RotateCcw className="size-4 mr-2" />
                    {t("page.settings.subscription-settings.reset-placeholders")}
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="w-fit"
                    onClick={handleAddRemark}
                >
                    <Plus className="size-4 mr-2" />
                    {t("page.settings.subscription-settings.add-placeholder-remark")}
                </Button>
            </HStack>
        </>
    );
};

