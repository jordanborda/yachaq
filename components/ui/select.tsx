import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SelectContextValue {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined)

const useSelectContext = () => {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within a Select")
  }
  return context
}

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

const Select = ({ value = '', onValueChange, children }: SelectProps) => {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(value)

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue)
    onValueChange?.(newValue)
    setOpen(false)
  }

  const contextValue: SelectContextValue = {
    value: internalValue,
    onValueChange: handleValueChange,
    open,
    onOpenChange: setOpen,
  }

  return (
    <SelectContext.Provider value={contextValue}>
      {children}
    </SelectContext.Provider>
  )
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { open, onOpenChange } = useSelectContext()

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onClick={() => onOpenChange(!open)}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

interface SelectValueProps {
  placeholder?: string
}

const SelectValue = ({ placeholder }: SelectValueProps) => {
  const { value } = useSelectContext()
  return <span>{value || placeholder}</span>
}

interface SelectContentProps {
  children: React.ReactNode
  className?: string
}

const SelectContent = ({ children, className }: SelectContentProps) => {
  const { open } = useSelectContext()

  if (!open) return null

  return (
    <div
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white text-gray-900 shadow-md animate-in fade-in-0 zoom-in-95",
        className
      )}
    >
      <div className="p-1">
        {children}
      </div>
    </div>
  )
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

const SelectItem = ({ value, children, className }: SelectItemProps) => {
  const { onValueChange } = useSelectContext()

  return (
    <div
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100",
        className
      )}
      onClick={() => onValueChange(value)}
    >
      {children}
    </div>
  )
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
}