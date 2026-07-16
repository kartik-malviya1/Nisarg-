"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

          {/* Desktop Nav Links */}
          <ul className="nav-links" id="navLinks">
            <li>
              <Link href="/" className={pathname === "/" ? "active" : ""}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={pathname === "/about" ? "active" : ""}>
                About
              </Link>
            </li>
            <li>
              <Link href="/programs" className={pathname === "/programs" ? "active" : ""}>
                Our Work
              </Link>
            </li>
            <li>
              <Link href="/impact" className={pathname === "/impact" ? "active" : ""}>
                Impact
              </Link>
            </li>
            <li>
              <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/contact#involve" className="nav-cta">
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

      {/* Mobile Drawer Backdrop */}
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
          <li>
            <Link
              href="/"
              className={pathname === "/" ? "active" : ""}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={pathname === "/about" ? "active" : ""}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/programs"
              className={pathname === "/programs" ? "active" : ""}
              onClick={() => setIsOpen(false)}
            >
              Our Work
            </Link>
          </li>
          <li>
            <Link
              href="/impact"
              className={pathname === "/impact" ? "active" : ""}
              onClick={() => setIsOpen(false)}
            >
              Impact
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={pathname === "/contact" ? "active" : ""}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/contact#involve"
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
