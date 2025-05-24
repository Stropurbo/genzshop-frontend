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
		<div>
			<div className="flex justify-center gap-4 mt-3 text-white">
				<div>
					<p className="text-center text-yellow-500 text-2xl md:text-4xl font-bold">
						{timeLeft.days}
					</p>
					<p className="font-bold text-center">Days</p>
				</div>
				<div>
					<p className="text-center text-yellow-500 text-2xl md:text-4xl font-bold">
						{timeLeft.hours}
					</p>
					<p className="font-bold text-center">Hour</p>
				</div>
				<div>
					<p className="text-center text-yellow-500 text-2xl md:text-4xl font-bold">
						{timeLeft.minutes}
					</p>
					<p className="font-bold text-center">Min</p>
				</div>
				<div>
					<p className="text-center text-yellow-500 text-2xl md:text-4xl font-bold">
						{timeLeft.secound}
					</p>
					<p className="font-bold text-center">Sec</p>
				</div>
			</div>
		</div>
	)
};

export default DiscountTimer;