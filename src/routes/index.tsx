import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <>
      <main>
        <img className="absolute z-0 w-screen h-screen object-cover" src="public/bg.png" alt="bg"/>
        <section className="relative z-1 flex ">
          <div>aaaaaaaa</div>
        </section>
      </main>
      <footer></footer>
    </>
  )
}
