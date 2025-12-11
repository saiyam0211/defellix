import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = ({
  className,
  blurIntensity = "sm",
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
  blurIntensity?: "sm" | "md" | "lg";
}) => {
  const blurClass = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
  }[blurIntensity];

  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out",
        blurClass,
        className
      )}
      {...props}
    />
  );
};

export const DialogContent = ({
  className,
  children,
  blurIntensity = "sm",
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  blurIntensity?: "sm" | "md" | "lg";
}) => (
  <DialogPortal>
    <DialogOverlay blurIntensity={blurIntensity} />
    <DialogPrimitive.Content
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-surface p-6 shadow-lg focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-3 top-3 rounded-full p-1 text-muted hover:bg-secondary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <X className="h-4 w-4" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
);

export const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-2 text-left", className)} {...props} />
);

export const DialogTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-xl font-semibold text-foreground", className)} {...props} />
);

export const DialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-muted", className)} {...props} />
);
