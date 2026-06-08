'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useState } from 'react';

const navigationLinks = {
  Shopping: [
    { label: 'Shop All', href: '#' },
    { label: 'New Arrivals', href: '#' },
    { label: 'Sale', href: '#' },
    { label: 'Gift Cards', href: '#' },
  ],
  Company: [
    { label: 'Our Story', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Sustainability', href: '#' },
    { label: 'Press', href: '#' },
  ],
};

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
];


const currentYear = new Date().getFullYear();


const Footer = () => {
    const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };


  return (
        <footer className="bg-[color:var(--primary)]">
     
      <div className="container-max px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
        
          <div className="flex flex-col gap-4">
            <h2 className="text-h3 font-bold text-white">Shelly Collections</h2>
            <p className="text-body-sm text-white max-w-sm">
              Redefining the standard of online retail through curated quality and frictionless experiences. Designed for those who appreciate the finer things.
            </p>
           
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-[color:var(--surface)] border border-[color:var(--outline-variant)] flex items-center justify-center text-[color:var(--on-surface-variant)] hover:text-[color:var(--primary)] hover:border-[color:var(--primary)] transition-all"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

        
          <div>
            <h3 className="text-label-lg font-semibold text-white mb-4">
              Shopping
            </h3>
            <ul className="space-y-3">
              {navigationLinks.Shopping.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-body-sm text-white hover:text-[color:var(--primary)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        
          <div>
            <h3 className="text-label-lg font-semibold text-white mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {navigationLinks.Company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-body-sm text-white hover:text-[color:var(--primary)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        
          <div>
            <h3 className="text-label-lg font-semibold text-white mb-4">
              Newsletter
            </h3>
            <p className="text-body-sm text-white mb-4">
              Join our elite circle for exclusive previews and priority access.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white border-[color:var(--outline-variant)] text-[color:var(--foreground)] placeholder-[color:var(--on-surface-variant)]/50"
              />
              <Button className="bg-[color:var(--primary)] hover:bg-[color:var(--primary-container)] text-white px-6">
                Join
              </Button>
            </form>
          </div>
        </div>

       
        <div className="h-px bg-white mb-8"></div>

        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-body-sm text-white">
          <p>&copy; {currentYear} Shelly Collections All rights reserved.</p>

          
          <div className="flex gap-6">
            <a href="#" className="hover:text-[color:var(--primary)] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[color:var(--primary)] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[color:var(--primary)] transition-colors">
              Shipping & Returns
            </a>
            <a href="#" className="hover:text-[color:var(--primary)] transition-colors">
              Help Center
            </a>
            <a href="#" className="hover:text-[color:var(--primary)] transition-colors">
              Store Locator
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer