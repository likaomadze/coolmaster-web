import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
      <div className="container grid gap-8 md:grid-cols-4">
        <div>
          <p className="font-black">AeroFlow</p>
          <p className="mt-3 text-sm text-slate-500">Enterprise-grade HVAC booking, dispatch and service operations.</p>
        </div>
        {[
          ["Platform", "Booking", "CRM", "Technicians"],
          ["Company", "About", "Contact", "Certifications"],
          ["Ops", "API", "Security", "Status"]
        ].map((group) => (
          <div key={group[0]} className="space-y-2 text-sm">
            <p className="font-semibold">{group[0]}</p>
            {group.slice(1).map((item) => (
              <Link key={item} href="#" className="block text-slate-500 hover:text-cyan">
                {item}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
