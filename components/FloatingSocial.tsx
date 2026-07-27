"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const FloatingSocials = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/login") || pathname.startsWith("/admin")) {
    return null;
  }

  const socials = [
    {
      name: "linkedin",
      icon: <FaLinkedin size={20} />,
      url: "https://www.linkedin.com/company/tanxinnovations/",
    },
    {
      name: "instagram",
      icon: <FaInstagram size={20} />,
      url: "https://www.instagram.com/tanxinnovations/",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.5 }}
      className="floating-socials"
    >
      {socials.map((social, index) => (
        <motion.a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.95 }}
          className={`floating-socials-link ${social.name}`}
        >
          {social.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default FloatingSocials;

