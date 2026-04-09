
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import * as React from 'react'
import { Button } from '#/components/ui/button.tsx'

interface InputIconProps {
  label: string
  type: React.HTMLInputTypeAttribute
  placeholder: string
  icon: React.ReactNode
  description: string
}

export function InputIcon(props: InputIconProps) {
  return (
    <Field className="max-w-sm">
      <FieldLabel className="uppercase text-on-surface-secundary" htmlFor="inline-end-input">{props.label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="inline-end-input"
          type={props.type}
          placeholder={props.placeholder}
        />
        <InputGroupAddon align="inline-end">
          <Button variant="ghost" type="button">{props.icon}</Button>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>{props.description}</FieldDescription>
    </Field>
  )
}
