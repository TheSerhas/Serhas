import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    Input,
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@serhas/common/components";
import { useWatch, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MailWarning, TrashIcon } from "lucide-react";
import type { FC } from "react";

type FragmentValue = {
    packets: string;
    length: string;
    interval: string;
};

type FragmentFormValues = {
    fragment: FragmentValue | null;
} & Record<string, unknown>;

const FragmentErrorPopover: FC = () => {
    const form = useFormContext<FragmentFormValues>();
    const { t } = useTranslation();
    const fragmentErrors = form.formState.errors.fragment;

    const translate = (message: unknown) =>
        typeof message === "string" ? t(message) : null;

    const lengthMessage = translate(fragmentErrors?.length?.message);
    const packetsMessage = translate(fragmentErrors?.packets?.message);
    const intervalMessage = translate(fragmentErrors?.interval?.message);

    return (
        <Popover>
            <PopoverTrigger>
                <MailWarning className="p-0 size-5 text-destructive bg-primary-background" />
            </PopoverTrigger>
            <PopoverContent className="bg-destructive-accent text-sm">
                <ul className="my-6 ml-3 list-disc [&>li]:mt-1 mt-0">
                    {lengthMessage && (
                        <li>
                            <b>Length:</b> {lengthMessage}
                        </li>
                    )}
                    {packetsMessage && (
                        <li>
                            <b>Packets:</b> {packetsMessage}
                        </li>
                    )}
                    {intervalMessage && (
                        <li>
                            <b>Interval:</b> {intervalMessage}
                        </li>
                    )}
                </ul>
            </PopoverContent>
        </Popover>
    );
};

export const FragmentField = () => {
    const { t } = useTranslation();
    const form = useFormContext<FragmentFormValues>();
    const fragmentErrors = form.formState.errors.fragment;
    const fragment = useWatch<FragmentFormValues>({
        control: form.control,
        name: "fragment",
    });
    const disabled = fragment == null;

    const enable = () => {
        form.setValue(
            "fragment",
            { length: "", packets: "", interval: "" },
            {
                shouldTouch: true,
                shouldDirty: true,
            },
        );
    };

    const disable = () => {
        form.setValue("fragment.length", "");
        form.setValue("fragment.packets", "");
        form.setValue("fragment.interval", "");
        form.setValue("fragment", null, {
            shouldValidate: true,
            shouldTouch: false,
            shouldDirty: false,
        });
    };

    const hasFragmentErrors =
        Boolean(fragmentErrors?.packets) ||
        Boolean(fragmentErrors?.length) ||
        Boolean(fragmentErrors?.interval);

    return (
        <FormField
            control={form.control}
            name="fragment"
            render={() => (
                <FormItem className="my-2 w-full">
                    <FormLabel className="flex flex-row justify-between items-center">
                        {t("fragment")}
                        <div className="flex flex-row items-center gap-2">
                            {hasFragmentErrors && <FragmentErrorPopover />}
                            {!disabled && (
                                <Button
                                    variant="destructive"
                                    className="p-0 size-5 bg-primary-background"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        disable();
                                    }}
                                >
                                    <TrashIcon className="text-red-400" />
                                </Button>
                            )}
                        </div>
                    </FormLabel>

                    <FormControl>
                        <div className="flex flex-row w-full items-center">
                            {!disabled ? (
                                <>
                                    <FormField
                                        name="fragment.packets"
                                        render={({ field }) => (
                                            <div className="flex flex-col">
                                                <FormItem>
                                                    <FormLabel className="font-medium">
                                                        {t("page.hosts.fragment.packets")}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="border rounded-none rounded-s-lg p-2 w-full"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            </div>
                                        )}
                                    />
                                    <FormField
                                        name="fragment.length"
                                        render={({ field }) => (
                                            <div className="flex flex-col">
                                                <FormItem>
                                                    <FormLabel className="font-medium">
                                                        {t("page.hosts.fragment.length")}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="rounded-none w-full p-2"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            </div>
                                        )}
                                    />
                                    <FormField
                                        name="fragment.interval"
                                        render={({ field }) => (
                                            <div className="flex flex-col">
                                                <FormItem>
                                                    <FormLabel className="font-medium">
                                                        {t("page.hosts.fragment.interval")}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="border w-full rounded-none rounded-e-lg p-2"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            </div>
                                        )}
                                    />
                                </>
                            ) : (
                                <Button
                                    className="border w-full"
                                    variant="ghost"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        enable();
                                    }}
                                >
                                    {t("disabled")}
                                </Button>
                            )}
                        </div>
                    </FormControl>
                </FormItem>
            )}
        />
    );
};
