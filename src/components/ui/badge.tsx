import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "text-foreground",
        // ข้อ 3: สถานะ "ลงทะเบียนแล้ว" -> Light = amber, Dark = purple
        enrolled:
          "border-transparent bg-amber-100 text-amber-800 dark:bg-purple-500/15 dark:text-purple-300",
        // ข้อ 3: สถานะ "เปิดรับ" -> Light = purple, Dark = amber
        open: "border-transparent bg-purple-100 text-purple-800 dark:bg-amber-500/15 dark:text-amber-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
