import {
    HStack,
} from "@serhas/common/components";
import {
    RemarkField,
    AddressField,
    PortField,
    WeightField,
} from ".";

export const CommonFields = () => (
    <>
        <RemarkField />
        <HStack className="gap-2 items-start">
            <AddressField />
            <PortField />
            <WeightField />
        </HStack>
    </>
)
