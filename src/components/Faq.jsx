import React from 'react';
import { BsPlus } from 'react-icons/bs';

const questions = [
	{
		question: 'What data does the platform collect?',
		answer:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam vitae repellendus quaerat nulla, corporis fugit ad ratione officiis tenetur delectus nobis, repellat totam a esse suscipit expedita. Repellat, id omnis.',
	},
	{
		question: 'How is my data secured?',
	},
	{
		question: 'What type of errors can I track?',
	},
	{
		question: 'Who can access my data?',
	},
	{
		question: 'Is there a cost associated with the platform?'
	}
];

const Faq = () => {
	return (
		<div className="w-[90%] m-auto md:w-1/2">
			{questions.map((q, index) => (
				<React.Fragment key={q.question + index}>
					<div className="collapse collapse-plus rounded-md outline outline-1 outline-gray-400">
						<input
							type="radio"
							name="my-accordion-3"
							defaultChecked={index == 0}
						/>
						<div className="collapse-title md:text-xl font-medium">
							{q.question}
						</div>
						<div className="collapse-content text-sm md:text-base">
							<p>{q.answer}</p>
						</div>
					</div>
					<div className="pt-6 md:pt-4"></div>
				</React.Fragment>
			))}
		</div>
	);
};

export default Faq;
