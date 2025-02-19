// "use client"

// import * as React from "react"
// import * as SwitchPrimitives from "@radix-ui/react-switch"

// import { cn } from "@/lib/utils"

// const Switch = React.forwardRef<
//   React.ElementRef<typeof SwitchPrimitives.Root>,
//   React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
// >(({ className, ...props }, ref) => (
//   <SwitchPrimitives.Root
//     className={cn(
//       "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
//       className
//     )}
//     {...props}
//     ref={ref}
//   >
//     <SwitchPrimitives.Thumb
//       className={cn(
//         "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
//       )}
//     />
//   </SwitchPrimitives.Root>
// ))
// Switch.displayName = SwitchPrimitives.Root.displayName

// export { Switch }

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const switchVariants = cva(
    "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
    {
        variants: {
            variant: {
                default: "bg-primary hover:bg-primary/90",
                destructive: "bg-destructive hover:bg-destructive/90",
                outline: "border border-input bg-background hover:bg-accent",
                secondary: "bg-secondary hover:bg-secondary/80"
            },
            size: {
                default: "h-6 w-11",
                lg: "h-10 w-16"
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default"
        }
    }
);

export interface SwitchProps
    extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
        VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    SwitchProps
>(({ className, variant, size, ...props }, ref) => {
    const notchSize = size === "lg" ? "size-7" : "size-5";
    const notchPosition =
        size === "lg"
            ? "data-[state=checked]:translate-x-8"
            : "data-[state=checked]:translate-x-5";
    return (
        <SwitchPrimitives.Root
            className={cn(switchVariants({ variant, size }), className)}
            {...props}
            ref={ref}
        >
            <SwitchPrimitives.Thumb
                className={cn(
                    "bg-background pointer-events-none block size-5 rounded-full ring-0 shadow-lg transition-transform data-[state=unchecked]:translate-x-0",
                    notchSize,
                    notchPosition
                )}
            />
        </SwitchPrimitives.Root>
    );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
