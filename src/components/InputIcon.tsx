
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
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBtnClick?: () => void
}

export function InputIcon(props: InputIconProps & { 'data-invalid'?: boolean }) {
  return (
    <Field className="max-w-sm" data-invalid={props['data-invalid']}>
      <FieldLabel className="uppercase text-on-surface-secundary" htmlFor="inline-end-input">{props.label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id="inline-end-input"
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          aria-invalid={props['data-invalid']}
        />
        <InputGroupAddon align="inline-end">
          <Button onClick={props.onBtnClick} variant="ghost" type="button">{props.icon}</Button>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>{props.description}</FieldDescription>
    </Field>
  )
}
