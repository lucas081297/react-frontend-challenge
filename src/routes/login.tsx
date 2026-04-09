import { createFileRoute, redirect } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card.tsx'
import { Form } from 'radix-ui'
import { Field } from '@radix-ui/react-form'
import { FieldLabel } from '#/components/ui/field.tsx'
import { Input } from '#/components/ui/input.tsx'
import { InputIcon } from '#/components/InputIcon.tsx'
import { EyeOffIcon } from 'lucide-react'
import { Button } from '#/components/ui/button.tsx'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaApple } from 'react-icons/fa6'

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({ to: '/home' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="w-screen h-screen relative">
      <div className="absolute inset-0 z-0">
        <img
          alt="Cinematic Backdrop"
          className="w-full h-full object-cover opacity-40 grayscale-[0.5]"
          data-alt="Bg"
          src="/public/bg.png"
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/60 to-surface/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#131313_100%)] opacity-80"></div>
      </div>
      <section className="w-full h-full relative z-1 flex flex-col justify-center items-center animate-fade-in-up">
        <div className="flex flex-col items-center mb-10 gap-2">
          <h1 className="uppercase text-on-surface-primary text-4xl font-bold font-headline">
            Rotten Potatoes
          </h1>
          <span className="text-on-surface-secundary">Nao sei ainda</span>
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
              <Form.Root>
                <div className="flex flex-col items-left gap-4">
                  <Field name="email">
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
                    />
                  </Field>
                  <InputIcon
                    label={'Senha'}
                    type={'password'}
                    placeholder={'Digite sua senha'}
                    icon={<EyeOffIcon />}
                    description={''}
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
