import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/done')({
  component: () => (
    <>
      <div>Hello /done!</div>
    </>
  )
})
