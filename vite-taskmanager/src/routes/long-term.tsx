import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/long-term')({
  component: () => <div>Hello /long-term!</div>
})
