import { Button } from '#/components/ui/button.tsx'
import { cn } from '#/lib/utils'

interface ButtonIconProps extends React.ComponentProps<typeof Button> {
  icon: React.ReactNode
  label: string
}

export function ButtonIcon({ icon, label, className, ...props }: ButtonIconProps) {
  return (
    <Button
      className={cn(
        'bg-on-surface-primary text-black font-bold h-auto px-6 py-3 gap-2 transition-all hover:scale-105',
        className
      )}
      {...props}
    >
      {icon}
      <span className="max-sm:hidden">{label}</span>
    </Button>
  )
}