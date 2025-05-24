import React from 'react';

const Features = () => {
    const featuresitem = [
		{
			icon: (
				<img
					src="https://i.ibb.co/9H34KyRt/img-icons8.png"
					alt="image"
					className="w-15 h-15"
				/>
			),
			title: 'Free Shipping',
			des: 'Enjoy Free, Fast & Hassle-Free Delivery on All Orders!',
		},
		{
			icon: (
				<img
					src="https://i.ibb.co/kgG9D1NW/img-icons8.png"
					alt="image"
					className="w-15 h-15"
				/>
			),
			title: '24X7 Support',
			des: 'We Guarantee Premium Quality in Every Product You Choose – Because You Deserve the Best.',
		},
		{
			icon: (
				<img
					src="https://i.ibb.co/jPHPp3Y1/img-icons8.png"
					alt="image"
					className="w-15 h-15"
				/>
			),
			title: '30 Days Return',
			des: 'We Guarantee Premium Quality in Every Product You Choose – Because You Deserve the Best.',
		},
		{
			icon: (
				<img
					src="https://i.ibb.co/mCjQX6RR/img-icons8.png"
					alt="image"
					className="w-15 h-15"
				/>
			),
			title: 'Payment Secure',
			des: 'We Guarantee Premium Quality in Every Product You Choose – Because You Deserve the Best.',
		},
	]

    return (
        <section className='px-8 py-15'>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
               {
                featuresitem.map( 
                    (item, index) => (
                        <div key={index} className='flex flex-col items-center text-center border border-gray-200 p-5'>
                            {item.icon}
                        <h3 className='text-lg font-semibold mt-2'>{item.title}</h3>
                        <p className='text-gray-500 text-sm'>
                        {item.des}
                        </p>      
                        </div>
                    )
                )
               }
            </div>
        </section>
    );
};

export default Features;