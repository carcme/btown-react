import * as React from "react";
import { GripVertical, RotateCcw } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { useRef, useState } from "react";

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
);

const ResizablePanel = ({
  className,
  children,
  showResetSize,
  defaultSize,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel> & {
  showResetSize?: number;
  defaultSize?: number;
}) => {
  const ref = useRef<ResizablePrimitive.ImperativePanelHandle>(null);
  const [size, setSize] = useState<number>(Number(defaultSize));

  const handleReset = () => {
    const panel = ref.current;
    if (panel) {
      panel.resize(Number(defaultSize));
    }
  };
  return (
    <ResizablePrimitive.Panel
      ref={ref}
      className={cn("relative", className)}
      onResize={v => setSize(v)}
      defaultSize={defaultSize}
      {...props}
    >
      {/* Show Reset button */}
      {showResetSize && size > showResetSize && (
        <div>
          <Button
            variant={"default"}
            className="absolute right-2 bottom-2 z-1000 flex items-center gap-2 px-2"
            onClick={handleReset}
            size="sm"
          >
            <span className="hidden sm:block">Reset</span>
            <RotateCcw className="motion-safe:animate-wiggle h-6 w-6 scale-x-[-1] sm:hidden" />
          </Button>{" "}
          <Button
            variant={"default"}
            className="absolute top-2 right-2 z-1000 flex items-center gap-2 px-2"
            onClick={handleReset}
            size="sm"
          >
            <span className="hidden sm:block">Reset</span>
            <RotateCcw className="motion-safe:animate-wiggle h-6 w-6 scale-x-[-1] sm:hidden" />
          </Button>
        </div>
      )}
      {children}
    </ResizablePrimitive.Panel>
  );
};

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="bg-border z-10 flex h-8 w-4 items-center justify-center rounded-sm border">
        <GripVertical className="text-muted-foreground size-4" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
