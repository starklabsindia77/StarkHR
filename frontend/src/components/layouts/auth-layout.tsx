interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid place-items-center bg-background p-4">
      <div className="w-full max-w-[800px]">
        <div className="rounded-lg border bg-card p-8">
          {children}
        </div>
      </div>
    </div>
  )
}