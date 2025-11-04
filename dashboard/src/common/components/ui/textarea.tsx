import * as React from "react"

import { cn } from "@serhas/common/utils"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    `flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                        ring-offset-background placeholder:text-muted-foreground
                        focus:outline-none focus-visible:outline-none
                        focus:ring-0 focus-visible:ring-0
                        focus:border-black
                        disabled:cursor-not-allowed disabled:opacity-50`,
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }
