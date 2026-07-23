import { NavLink, useLocation } from "react-router-dom";

// links = [{ to, label, icon, end, children: [{ to, label }] }]
export default function Sidebar({ title, subtitle, links }) {
  const location = useLocation();

  return (
    <aside className="sticky top-0 flex h-screen w-60 flex-shrink-0 flex-col overflow-y-auto bg-navy-deep px-4 py-6 text-white/70">
      <div className="mb-8 flex items-center gap-2 px-2">
        <svg viewBox="0 0 100 100" className="h-7 w-7" fill="none">
          <path
            d="M50 8C58 8 64 13 70 22L88 50C92 56 92 64 88 70C84 76 77 80 68 80H32C23 80 16 76 12 70C8 64 8 56 12 50L30 22C36 13 42 8 50 8Z"
            stroke="#fff"
            strokeWidth="7"
          />
          <path d="M22 58C34 58 40 50 50 40C60 50 66 58 78 58" stroke="#CB9A56" strokeWidth="8" strokeLinecap="round" />
        </svg>
        <span className="font-display text-lg font-bold text-white">Diyafa</span>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const hasChildren = link.children?.length > 0;
          const childActive = hasChildren && link.children.some((c) => location.pathname.startsWith(c.to));

          return (
            <div key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive || childActive ? "bg-gold text-navy-deep font-bold" : "hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>

              {hasChildren && (
                <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                  {link.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      end={child.end}
                      className={({ isActive }) =>
                        `rounded-md px-2.5 py-1.5 text-xs font-medium transition ${
                          isActive ? "bg-white/10 text-gold" : "text-white/50 hover:text-white"
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-4">
        <p className="px-2 text-xs font-semibold text-white">{title}</p>
        <p className="px-2 text-xs text-white/40">{subtitle}</p>
      </div>
    </aside>
  );
}
