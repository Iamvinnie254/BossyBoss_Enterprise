import React from "react";

const Footer = () => {
  return (
    <footer className="hidden md:block bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-3">BossyBoss</h3>
          <p className="text-sm">
            Premium shopping experience with trusted products.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>About</li>
            <li>Contact</li>
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <p className="text-sm">support@bossyboss.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
