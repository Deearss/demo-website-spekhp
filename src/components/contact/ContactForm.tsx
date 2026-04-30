"use client"

export default function ContactForm() {
  return (
    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-3)" }}>
            Nama
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="h-11 px-4 rounded-xl text-sm outline-none transall"
            style={{ background: "var(--bg-3)", border: "1px solid var(--border-2)", color: "var(--text)" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--gold)" }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-2)" }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-3)" }}>
            Email
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            className="h-11 px-4 rounded-xl text-sm outline-none transall"
            style={{ background: "var(--bg-3)", border: "1px solid var(--border-2)", color: "var(--text)" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--gold)" }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-2)" }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-3)" }}>
          Subjek
        </label>
        <input
          type="text"
          placeholder="Subjek pesan..."
          className="h-11 px-4 rounded-xl text-sm outline-none transall"
          style={{ background: "var(--bg-3)", border: "1px solid var(--border-2)", color: "var(--text)" }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--gold)" }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-2)" }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--text-3)" }}>
          Pesan
        </label>
        <textarea
          rows={5}
          placeholder="Tulis pesan Anda di sini..."
          className="px-4 py-3 rounded-xl text-sm outline-none resize-none transall"
          style={{ background: "var(--bg-3)", border: "1px solid var(--border-2)", color: "var(--text)" }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--gold)" }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-2)" }}
        />
      </div>

      <button
        type="submit"
        className="h-11 rounded-xl text-sm font-semibold transall hover:opacity-90 mt-1"
        style={{ background: "var(--gold)", color: "#0D1B2A" }}
      >
        Kirim Pesan
      </button>

      <p className="text-xs text-center" style={{ color: "var(--text-3)" }}>
        * Form ini non-fungsional pada versi demo.
      </p>
    </form>
  )
}
