export default function BookingCancelledPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf8] px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl border border-neutral-200 overflow-hidden">
          <div className="px-10 py-10 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-[#1a1a18]">
              Booking Cancelled
            </h1>

            <p className="mt-3 text-neutral-500 text-[15px] leading-relaxed">
              Your reservation has been successfully cancelled. No charges have
              been made.
            </p>

            {/* Divider */}
            <div className="my-8 border-t border-neutral-100" />

            {/* Info row */}
            <div className="flex items-start gap-3 bg-neutral-50 rounded-2xl px-5 py-4 text-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-neutral-400 mt-0.5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
              <p className="text-[13px] text-neutral-500 leading-relaxed">
                Changed your mind? Your dates are now open again. We'd love to
                have you — feel free to make a new booking anytime.
              </p>
            </div>

            {/* CTA */}
            <a
              href="/"
              className="mt-6 inline-flex items-center gap-2 bg-[#2d4a3e] hover:bg-[#243d33] transition-colors text-white text-sm font-medium px-6 py-3 rounded-xl"
            >
              Back to home
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-[12px] text-neutral-400">
          A confirmation of your cancellation has been sent to your email.
        </p>
      </div>
    </div>
  );
}
