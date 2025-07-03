// pages/FloatingFilter.jsx
import { useEffect, useRef, useState } from 'react'

const FloatingFilter = ({ children }) => {
	const [top, setTop] = useState(100)
	const filterRef = useRef(null)

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY
			const footer = document.querySelector('footer')
			const filterEl = filterRef.current

			if (footer && filterEl) {
				const footerTop = footer.getBoundingClientRect().top + window.scrollY
				const filterHeight = filterEl.offsetHeight
				const maxTop = footerTop - filterHeight - 30 

				const newTop = Math.min(scrollY + 100, maxTop)
				setTop(newTop)
			}
		}

		handleScroll() // initial run
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<div
			ref={filterRef}
			className="w-72 hidden md:block transition-all duration-300 ease-in-out"
			style={{
				position: 'absolute',
				top: `${top}px`,
			}}
		>
			{children}
		</div>
	)
}

export default FloatingFilter
