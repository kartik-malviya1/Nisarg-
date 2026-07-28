"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "About NISARG",
        href: "/about",
        desc: "Our story, vision & mission",
      },
      { label: "Our Team", href: "/team", desc: "Leadership & advisory board" },
    ],
  },
  {
    label: "Our Work",
    href: "/programs",
    children: [
      {
        label: "Projects & Initiatives",
        href: "/projects",
        desc: "Field-level project log",
      },
      {
        label: "Knowledge Centre",
        href: "/knowledge",
        desc: "Guides, research & toolkits",
      },
    ],
  },
  {
    label: "Media",
    href: "/media",
    children: [
      {
        label: "Gallery",
        href: "/gallery",
        desc: "Photo stories from the field",
      },
      {
        label: "News & Events",
        href: "/news",
        desc: "Latest updates & events",
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
  },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const pathname = usePathname();
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Added a ref to track the timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setHasShadow(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // New hover handlers
  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // 150ms delay allows the mouse to cross the gap
  };

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.href === "/" && pathname === "/") return true;
    if (item.href !== "/" && pathname.startsWith(item.href)) return true;
    if (item.children)
      return item.children.some(
        (c) => c.href !== "/" && pathname.startsWith(c.href),
      );
    return false;
  };

  return (
    <>
      <nav
        className="nav"
        style={{
          boxShadow: hasShadow ? "0 8px 24px -12px rgba(0,0,0,0.4)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <div className="wrap">
          <Link href="/" className="brand">
            <img
              src="/nisarg-full-logo.png"
              alt="NISARG Foundation"
              style={{ height: "50px", objectFit: "contain", width: "auto" }}
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="nav-links" id="navLinks" ref={dropdownRef}>
            {navItems.map((item) => (
              <li
                key={item.label}
                className={item.children ? "nav-item has-dropdown" : "nav-item"}
                onMouseEnter={() =>
                  item.children && handleMouseEnter(item.label)
                }
                onMouseLeave={handleMouseLeave}
              >
                {item.children ? (
                  <>
                    <button
                      className={`nav-dropdown-trigger ${isActive(item) ? "active" : ""}`}
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.label ? null : item.label,
                        )
                      }
                      aria-expanded={activeDropdown === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        className={`nav-chevron ${activeDropdown === item.label ? "open" : ""}`}
                      />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="nav-dropdown">
                        {item.children.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            className={`nav-dropdown-item ${pathname === child.href ? "active" : ""}`}
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="ndi-label">{child.label}</span>
                            <span className="ndi-desc">{child.desc}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={isActive(item) ? "active" : ""}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Link href="/get-involved" className="nav-cta">
                Get Involved
              </Link>
            </li>
          </ul>

          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div className="nav-backdrop" onClick={() => setIsOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <div className={`nav-drawer ${isOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <Link href="/" className="brand" onClick={() => setIsOpen(false)}>
            <img
              src="/nisarg-full-logo.png"
              alt="NISARG Foundation"
              style={{ height: "40px", objectFit: "contain", width: "auto" }}
            />
          </Link>
          <button
            className="drawer-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <ul className="drawer-links">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <>
                  <button
                    className={`drawer-group-toggle ${mobileExpanded === item.label ? "open" : ""}`}
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === item.label ? null : item.label,
                      )
                    }
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={14}
                      className={`nav-chevron ${mobileExpanded === item.label ? "open" : ""}`}
                    />
                  </button>
                  {mobileExpanded === item.label && (
                    <ul className="drawer-sub">
                      {item.children.map((child) => (
                        <li key={child.href + child.label}>
                          <Link
                            href={child.href}
                            className={pathname === child.href ? "active" : ""}
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={isActive(item) ? "active" : ""}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li>
            <Link
              href="/get-involved"
              className="nav-cta"
              onClick={() => setIsOpen(false)}
            >
              Get Involved
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
