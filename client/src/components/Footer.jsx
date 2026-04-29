import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className='bg-gray-900 text-gray-400'>

            {/* Main Footer */}
            <div className='max-w-5xl mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10'>

                {/* Brand */}
                <div>
                    <h2 className='text-white text-xl font-bold mb-3'>✦ WordCraft</h2>
                    <p className='text-sm leading-relaxed text-gray-400'>
                        A space for curious minds. We write about tech, facts, and ideas
                        that make you think differently.
                    </p>
                    <p className='text-sm leading-relaxed text-gray-400 mt-2 cursor-pointer hover:text-amber-400 transition-colors'
                        onClick={() => window.open("mailto:harschaudhary578@gmail.com")}>
                        harschaudhary578@gmail.com
                    </p>
                    <p className='text-sm leading-relaxed text-gray-400 mt-2 cursor-pointer hover:text-amber-400 transition-colors'>
                        +91 9167649656
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className='text-white text-sm font-semibold mb-4 uppercase tracking-wider'>Explore</h3>
                    <ul className='space-y-2 text-sm'>
                        <li>
                            <span
                                onClick={() => navigate('/')}
                                className='hover:text-amber-400 cursor-pointer transition-colors'
                            >
                                Home
                            </span>
                        </li>
                        <li>
                            <span
                                onClick={() => navigate('/dashboard')}
                                className='hover:text-amber-400 cursor-pointer transition-colors'
                            >
                                All posts
                            </span>
                        </li>
                        <li>
                            <span
                                onClick={() => navigate('/signup')}
                                className='hover:text-amber-400 cursor-pointer transition-colors'
                            >
                                Start writing
                            </span>
                        </li>
                        <li>
                            <span
                                onClick={() => navigate('/login')}
                                className='hover:text-amber-400 cursor-pointer transition-colors'
                            >
                                Login
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className='text-white text-sm font-semibold mb-4 uppercase tracking-wider'>Stay updated</h3>
                    <p className='text-sm mb-4'>Get the best posts delivered to your inbox weekly.</p>
                    <div className='flex gap-2'>
                        <input
                            type='email'
                            placeholder='your@email.com'
                            className='flex-1 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-amber-400 placeholder-gray-500'
                        />
                        <button className='bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors'>
                            Subscribe
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className='border-t border-gray-800 py-5 px-8'>
                <div className='max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3'>
                    <p className='text-xs text-gray-500'>
                        &copy; 2026 WordCraft. All rights reserved.
                    </p>
                    <div className='flex items-center gap-5 text-xs text-gray-500'>
                        <span className='hover:text-amber-400 cursor-pointer transition-colors'>Privacy policy</span>
                        <span className='hover:text-amber-400 cursor-pointer transition-colors'>Terms of use</span>
                        <span onClick={() => window.open("mailto:harschaudhary578@gmail.com")} className='hover:text-amber-400 cursor-pointer transition-colors'>Contact</span>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer