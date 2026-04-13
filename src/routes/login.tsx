import { createFileRoute, useNavigate } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card.tsx'
import { Form } from 'radix-ui'
import { Input } from '#/components/ui/input.tsx'
import { InputIcon } from '#/components/InputIcon.tsx'
import { EyeOffIcon } from 'lucide-react'
import { Button } from '#/components/ui/button.tsx'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaApple } from 'react-icons/fa6'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { Field } from '@radix-ui/react-form'
import { FieldError, FieldLabel } from '#/components/ui/field.tsx'
import { setToken, getToken } from '#/store/cookie.store.ts'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  )
  const [showPassword, setShowPassword] = useState(false)

  // Verifica autenticação no mount e redireciona se já estiver logado
  useEffect(() => {
    console.log('Login component mounted, checking auth...')
    if (getToken()) {
      console.log('User is authenticated, redirecting to /home')
      navigate({ to: '/home', replace: true })
    }
  }, [navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const result = loginSchema.safeParse({ email, password })

    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {}
      result.error.issues.forEach((issue) => {
        if (issue.path[0] === 'email') fieldErrors.email = issue.message
        if (issue.path[0] === 'password') fieldErrors.password = issue.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setToken('fake-token')
    toast.success('Login realizado com sucesso!')
    navigate({ to: '/home' })
  }

  return (
    <main className="w-screen h-screen relative">
      <div className="absolute inset-0 z-0">
        <img
          alt="Cinematic Backdrop"
          className="w-full h-full object-cover opacity-40 grayscale-[0.5]"
          data-alt="Bg"
          src="/bg.png"
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/60 to-surface/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#131313_100%)] opacity-80"></div>
      </div>
      <section className="w-full h-full relative z-1 flex flex-col justify-center items-center animate-fade-in-up">
        <div className="flex flex-col items-center mb-10 gap-2">
          <img
            src="/logo-nobg.png"
            alt="Rotten Potatoes"
            className="h-[250px] w-auto object-contain"
          />
          <span className="text-on-surface-secundary">
            A sua comunidade de cinema
          </span>
        </div>
        <div className="relative z-10 w-full max-w-md flex justify-center">
          <Card className="w-full max-w-sm bg-surface-variant backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] ring-1 ring-gray-50">
            <CardHeader>
              <CardTitle className="text-on-surface-primary text-xl mb-2">
                Bem vindo de volta
              </CardTitle>
              <CardDescription className="text-on-surface-secundary">
                Entre com suas credenciais para acessar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form.Root onSubmit={handleSubmit}>
                <div className="flex flex-col items-left gap-4">
                  <Field name="email" data-invalid={!!errors.email}>
                    <FieldLabel
                      className="uppercase text-on-surface-secundary mb-2"
                      htmlFor="input-email"
                    >
                      Email
                    </FieldLabel>
                    <Input
                      id="input-email"
                      type="text"
                      placeholder="email@exemplo.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (errors.email)
                          setErrors((prev) => ({ ...prev, email: undefined }))
                      }}
                      aria-invalid={!!errors.email}
                    />
                    <FieldError>{errors.email}</FieldError>
                  </Field>
                  <InputIcon
                    label={'Senha'}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={'Digite sua senha'}
                    icon={<EyeOffIcon />}
                    description={errors.password ?? ''}
                    value={password}
                    onBtnClick={() => setShowPassword(!showPassword)}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password)
                        setErrors((prev) => ({ ...prev, password: undefined }))
                    }}
                    data-invalid={!!errors.password}
                  />
                </div>
                <div className="mt-2 w-full text-center">
                  <Button
                    className="text-on-surface-secundary hover:cursor-pointer"
                    variant="link"
                  >
                    Não tenho Login
                  </Button>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
              </Form.Root>
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <div className="mt-6">
                <span className="block text-center mb-3 text-on-surface-secundary">
                  Ou Conecte com
                </span>
                <div className="flex items-center justify-center gap-2">
                  <Button className="hover:cursor-pointer" variant="outline">
                    <FcGoogle />
                  </Button>
                  <Button className="hover:cursor-pointer" variant="outline">
                    <FaFacebookSquare />
                  </Button>
                  <Button className="hover:cursor-pointer" variant="outline">
                    <FaApple />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  )
}
