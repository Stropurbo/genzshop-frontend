import React, { useEffect, useState } from 'react';

const DiscountTimer = () => {
    const targetDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 25 // 25 DAYS countdown
    
    const getTimeRemaining = () => {
        const now = new Date().getTime();
        const different = targetDate - now
    return{
        days: Math.floor(different / (1000 * 60 * 60 * 24)),
        hours: Math.floor((different / (1000 * 60 * 60)) % 24 ),
        minutes: Math.floor((different / (1000 * 60)) % 60),
        secound: Math.floor((different / 1000) % 60),
    }
    }
    const [timeLeft, setTimeleft] = useState(getTimeRemaining)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeleft(getTimeRemaining());
        }, 1000);
        return () => clearInterval(timer);
    }, [])

    return (
		<div className="flex flex-wrap justify-end mt-3 text-white">
			{[
				{ label: 'Days', value: timeLeft.days },
				{ label: 'Hour', value: timeLeft.hours },
				{ label: 'Min', value: timeLeft.minutes },
				{ label: 'Sec', value: timeLeft.secound },
			].map(({ label, value }) => (
				<div
					key={label}
					className="flex flex-col items-center px-2"
				>
					<p className="text-yellow-500 text-sm sm:text-2xl md:text-3xl font-bold leading-tight">
						{value.toString().padStart(2, '0')}
					</p>
					<p className="font-semibold text-xs sm:text-sm md:text-base">{label}</p>
				</div>
			))}
		</div>
	)
};

export default DiscountTimer;