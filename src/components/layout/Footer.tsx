import Link from 'next/link'
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer id="footer" className="matrix-bg border-t border-green-500/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <Shield className="h-8 w-8 matrix-text group-hover:animate-glow transition-all duration-300" />
              <span className="text-xl font-bold matrix-text font-mono">
                [NCC_<span className="text-green-400">CYBER_MATRIX</span>]
              </span>
            </Link>
            <p className="text-green-300/80 mb-4 max-w-md font-mono text-sm">
              {'>'}JOINING THE ULTIMATE CYBERSECURITY MATRIX PROTOCOL BY NITER COMPUTER CLUB_
              <br />
              {'>'}LEARN ETHICAL_HACKING, PENETRATION_TESTING, AND CYBERSECURITY_FUNDAMENTALS 
              FROM MATRIX_EXPERTS.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/ncc"
                target="_blank"
                rel="noopener noreferrer"
                className="matrix-text hover:animate-glow transition-all duration-300 button-interactive"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/ncc"
                target="_blank"
                rel="noopener noreferrer"
                className="matrix-text hover:animate-glow transition-all duration-300 button-interactive"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/ncc"
                target="_blank"
                rel="noopener noreferrer"
                className="matrix-text hover:animate-glow transition-all duration-300 button-interactive"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@ncc.org"
                className="matrix-text hover:animate-glow transition-all duration-300 button-interactive"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="matrix-text font-semibold mb-4 font-mono">[QUICK_LINKS]</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-green-300/70 hover:matrix-text hover:animate-glow transition-all duration-300 font-mono button-interactive">
                  [HOME]
                </Link>
              </li>
              <li>
                <Link href="#workshop" className="text-green-300/70 hover:matrix-text hover:animate-glow transition-all duration-300 font-mono button-interactive">
                  [WORKSHOP_DETAILS]
                </Link>
              </li>
              <li>
                <Link href="#schedule" className="text-green-300/70 hover:matrix-text hover:animate-glow transition-all duration-300 font-mono button-interactive">
                  [SCHEDULE]
                </Link>
              </li>
              <li>
                <Link href="#instructors" className="text-green-300/70 hover:matrix-text hover:animate-glow transition-all duration-300 font-mono button-interactive">
                  [INSTRUCTORS]
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-green-300/70 hover:matrix-text hover:animate-glow transition-all duration-300 font-mono button-interactive">
                  [REGISTER_NOW]
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="matrix-text font-semibold mb-4 font-mono">[CONTACT_MATRIX]</h3>
            <ul className="space-y-2 text-green-300/70 font-mono text-sm">
              <li>
                <strong className="matrix-text">[DATE]:</strong> SEPTEMBER_11_2025
              </li>
              <li>
                <strong className="matrix-text">[REGISTRATION]:</strong> SEP_6-10_2025
              </li>
              <li>
                <strong className="matrix-text">[FEE]:</strong> 100_TK
              </li>
              <li>
                <strong className="matrix-text">[PAYMENT]:</strong> 01784275877_(bKash/Nagad)
              </li>
              <li>
                <strong className="matrix-text">[EMAIL]:</strong>{' '}
                <a href="mailto:cyber@ncc.org" className="hover:animate-glow transition-all duration-300 button-interactive">
                  cyber@ncc.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-green-500/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-300/70 text-sm font-mono">
            © 2025 NITER_COMPUTER_CLUB. ALL_RIGHTS_RESERVED_BY MD_HABIBULLAH_MAHMUD
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-green-300/70 hover:matrix-text hover:animate-glow text-sm transition-all duration-300 font-mono button-interactive">
              [PRIVACY_POLICY]
            </Link>
            <Link href="/terms" className="text-green-300/70 hover:matrix-text hover:animate-glow text-sm transition-all duration-300 font-mono button-interactive">
              [TERMS_OF_SERVICE]
            </Link>
            <Link href="/support" className="text-green-300/70 hover:matrix-text hover:animate-glow text-sm transition-all duration-300 font-mono button-interactive">
              [SUPPORT]
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
