export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} 견적서 시스템. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
