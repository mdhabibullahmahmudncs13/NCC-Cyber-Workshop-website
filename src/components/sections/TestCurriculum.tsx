'use client'

export function TestCurriculum() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          What You'll Master in One Day
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
            <h3 className="text-xl font-semibold mb-4">Ethical Hacking</h3>
            <p className="text-slate-600">Learn penetration testing fundamentals and security assessment techniques</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
            <h3 className="text-xl font-semibold mb-4">OSINT & Intelligence</h3>
            <p className="text-slate-600">Master information gathering and reconnaissance techniques</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
            <h3 className="text-xl font-semibold mb-4">Network Security</h3>
            <p className="text-slate-600">Understand network protocols and security mechanisms</p>
          </div>
        </div>
      </div>
    </section>
  )
}
