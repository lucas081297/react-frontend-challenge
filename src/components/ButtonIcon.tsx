import { Button } from '#/components/ui/button.tsx'

interface ButtonIconProps {
  icon: React.ReactNode
  label: string
}

export function ButtonIcon(props: ButtonIconProps) {
  return (
    <>
      <Button className="bg-on-surface-primary text-amber-800 w-auto px-9 py-6">
        {props.icon}
        <span className="max-sm:hidden">{props.label}</span>
      </Button>
    </>
  )
}