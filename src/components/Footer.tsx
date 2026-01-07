"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Instagram, Twitter, Youtube, Linkedin, Mail, MapPin } from "lucide-react"
import Logo from "../assets/Logo.jpeg" // Adjust the import path as needed

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/pixel_craft_pccoer", label: "Instagram" },
  ]

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 pt-16 pb-8 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-1">
              <motion.div
                className="flex items-center gap-3 mb-6"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className=" flex items-center justify-center  rounded-lg ">
                  <img
                    src={Logo}
                    alt="PixelCraft Logo"
                    className="w-12 h-12 rounded-lg "
                  />
                </div>
                <div>
                  <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    PixelCraft
                  </span>
                  <p className="text-xs text-gray-400 mt-1">Animation Club</p>
                </div>
              </motion.div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Where creativity meets motion. Join the student animation revolution.
              </p>
            </div>

            {/* Quick Links */}
            <div className="ml-20">
              <h4 className="font-[family-name:var(--font-space-grotesk)] font-semibold mb-6 text-white text-lg">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {["Home", "About", "Team", "Events", "Gallery"].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                      className="group text-gray-400 hover:text-primary transition-all duration-300 text-sm flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-[family-name:var(--font-space-grotesk)] font-semibold mb-6 text-white text-lg">
                Connect
              </h4>
              <div className="space-y-4">
                <motion.div
                  className="flex items-center gap-3 text-gray-400 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors border border-primary/20">
                    <Mail size={16} className="text-primary" />
                  </div>
                  <span className="text-sm hover:text-primary transition-colors">pixelcraft@pccoer.in</span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 text-gray-400 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors border border-accent/20">
                    <MapPin size={16} className="text-accent" />
                  </div>
                  <span className="text-sm hover:text-accent transition-colors">PCCOER Building, Room 512</span>
                </motion.div>

                <div className="pt-4">
                  <p className="text-sm text-gray-400 mb-3">Follow us</p>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/10 transition-all duration-300 border border-gray-800 hover:border-primary/30"
                        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.3)" }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <social.icon size={18} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-900" />
            </div>
            <div className="relative flex justify-center">

            </div>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm text-center">
            © 2025 PixelCraft Animation Collective. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}