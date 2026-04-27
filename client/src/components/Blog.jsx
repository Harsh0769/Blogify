import React from 'react'
import '../index.css'

const CARDS = [
    { id: 1, title: "What is React?", desc: "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small, isolated pieces of code called components.", author: "John Doe" },
    { id: 2, title: "Node.js explained", desc: "Node.js is a runtime that lets you run JavaScript on the server. It's fast, lightweight, and perfect for building scalable backend APIs.", author: "Jane Smith" },
    { id: 3, title: "MongoDB basics", desc: "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It's great for apps that need fast iteration and flexible schemas.", author: "Rounak Pasi" },
    { id: 4, title: "Why Tailwind CSS?", desc: "Tailwind lets you build modern UIs without ever leaving your HTML. Its utility-first approach keeps your styles consistent and your bundle lean.", author: "Harsh Dev" },
]

const Blog = () => {
    return (
        <section className='py-12 bg-amber-50 border-t border-gray-100'>

            {/* Section Header */}
            <div className='text-center mb-8'>
                <h2 className='text-2xl font-bold text-gray-800'>Featured posts</h2>
                <p className='text-gray-400 text-sm mt-1'>Scroll through what people are writing</p>
            </div>

            {/* Carousel */}
            <div className='carousel-container'>

                {/* Track 1 */}
                <div className='carousel-track'>
                    {CARDS.map(card => (
                        <div key={card.id} className='card'>
                            <div>
                                <span className='text-xs font-semibold bg-amber-100 text-amber-700 px-3 py-1 rounded-full'>
                                    Post #{card.id}
                                </span>
                                <h3 className='text-base font-semibold text-gray-800 mt-3 mb-2'>{card.title}</h3>
                                <p className='text-sm text-gray-500 leading-relaxed line-clamp-4'>{card.desc}</p>
                            </div>
                            <p className='text-xs text-gray-400 mt-4 text-right'>— {card.author}</p>
                        </div>
                    ))}
                </div>

                {/* Track 2 — duplicate for seamless loop */}
                <div className='carousel-track' aria-hidden="true">
                    {CARDS.map(card => (
                        <div key={card.id} className='card'>
                            <div>
                                <span className='text-xs font-semibold bg-amber-100 text-amber-700 px-3 py-1 rounded-full'>
                                    Post #{card.id}
                                </span>
                                <h3 className='text-base font-semibold text-gray-800 mt-3 mb-2'>{card.title}</h3>
                                <p className='text-sm text-gray-500 leading-relaxed line-clamp-4'>{card.desc}</p>
                            </div>
                            <p className='text-xs text-gray-400 mt-4 text-right'>— {card.author}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Blog