import {
    FormField,
    FormItem,
    FormLabel,
    Switch,
    FormControl,
} from "@serhas/common/components";
import { useFormContext } from "react-hook-form";

export const SwitchField = ({ name, label }: { name: string, label: string }) => {
    const form = useFormContext();
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md py-2">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base">
                            {label}
                        </FormLabel>
                    </div>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}
