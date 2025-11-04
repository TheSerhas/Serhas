import { z } from "zod";
import { HostSchema, TlsSchema } from "@serhas/modules/hosts";

export const TuicSchema = HostSchema.merge(TlsSchema);

export type TuicSchemaType = z.infer<typeof TuicSchema>;
