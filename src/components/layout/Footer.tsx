import { Github } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Copyright */}
          <p className="text-sm text-gray-600">
            © {currentYear} Dystopia Labs
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              Privacy
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

