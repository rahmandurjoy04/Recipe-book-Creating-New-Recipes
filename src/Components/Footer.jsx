import React from 'react';
import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdMailOutline } from 'react-icons/md';

const Footer = () => {
    return (
        <footer className="bg-[#f0d3ce] text-black min-w-sm py-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Description */}
                <div>
                    <h1 className='text-4xl font-bold mb-4'>Recipe Book</h1>
                    <p className="text-sm">Explore Beautiful Recipes and Share your own recipes to the world.</p>
                    <div className='my-3 text-md'>
                        <h4 className='text-md font-semibold'>Office Address</h4>
                        <p>123/B, Road-6, Dhanmondi, Dhaka 1209, Bangladesh</p>
                        <p className='flex items-center gap-2 mt-2'><MdMailOutline className='text-lg'></MdMailOutline> <a href="mailto:nainurrahman70@gmail.com" className='className="link hover:text-blue-500 hover:underline">'>nainurrahman70@gmail.com</a></p>

                    </div>
                </div>

                {/* Important Links */}
                <div className='mx-auto'>
                    <h3 className="font-semibold text-lg mb-3">Important Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/terms" className="link link-hover">Terms of Service</a></li>
                        <li><a href="/privacy" className="link link-hover">Privacy Policy</a></li>
                        <li><a href="/developers" className="link link-hover">Developer Resources</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
                    <div className="flex space-x-4 text-2xl">
                        <a href="https://www.facebook.com/durjoy4004/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            <FaFacebook />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            <FaTwitter />
                        </a>
                        <a href="https://github.com/rahmandurjoy04" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/durjoy4004/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>


            </div>

            <div className="text-center mt-8 text-sm opacity-70">
                © {new Date().getFullYear()} <span className='font-extrabold'>Recipe Book</span>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;