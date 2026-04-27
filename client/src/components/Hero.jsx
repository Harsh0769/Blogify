import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section id="Home" className='bg-white border-b border-gray-100'>

            {/* Main Hero */}
            <div className='max-w-3xl mx-auto px-6 py-24 text-center'>

                {/* Badge */}
                <span className='inline-block bg-amber-50 text-amber-700 text-xs font-semibold px-4 py-1.5 rounded-full border border-amber-200 mb-6'>
                    Tech • Facts • Stories
                </span>

                {/* Heading */}
                <h1 className='text-5xl font-bold text-gray-900 leading-tight mb-6'>
                    Ideas worth reading,<br />
                    <span className='text-amber-500'>stories worth sharing.</span>
                </h1>

                {/* Subtext */}
                <p className='text-gray-500 text-lg leading-relaxed max-w-xl mx-auto mb-10'>
                    A space for curious minds — dive into tech breakdowns, hidden facts,
                    and perspectives that make you think differently about the world around you.
                </p>

                {/* CTA Buttons */}
                <div className='flex items-center justify-center gap-4'>
                    <button
                        onClick={() => navigate('/login')}
                        className='bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer'
                    >
                        Start reading
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className='text-sm font-semibold text-gray-600 hover:text-amber-500 px-6 py-3 rounded-full border border-gray-200 hover:border-amber-300 transition-colors cursor-pointer'
                    >
                        Start writing
                    </button>
                </div>
            </div>

            {/* Stats Bar */}
            <div className='border-t border-gray-100 py-6'>
                <div className='max-w-3xl mx-auto px-6 flex items-center justify-center gap-12'>
                    <div className='text-center'>
                        <p className='text-2xl font-bold text-gray-800'>100+</p>
                        <p className='text-xs text-gray-400 mt-0.5'>Articles published</p>
                    </div>
                    <div className='w-px h-8 bg-gray-200' />
                    <div className='text-center'>
                        <p className='text-2xl font-bold text-gray-800'>50+</p>
                        <p className='text-xs text-gray-400 mt-0.5'>Writers</p>
                    </div>
                    <div className='w-px h-8 bg-gray-200' />
                    <div className='text-center'>
                        <p className='text-2xl font-bold text-gray-800'>10k+</p>
                        <p className='text-xs text-gray-400 mt-0.5'>Monthly readers</p>
                    </div>
                </div>
            </div>

            <section id="about" className="max-w-3xl mx-auto px-6 py-16 text-center cursor-pointer">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About MyBlog</h2>
                <p className="text-gray-500 leading-relaxed">
                    MyBlog is a space for curious minds to share ideas about tech, facts,
                    and stories that matter. Whether you're here to read or write — you're
                    in the right place.
                </p>
            </section>


        </section>
    )
}

export default Hero