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
	// {
	// 	question: 'Is there a cost associated with using the platform?',
	// },
];

const Faq = () => {
	// return (
	// 	<ul className="w-[90%] md:w-1/2 m-auto">
	// 		{questions.map((q, index) => (
	// 			<li
	// 				className="border border-[#21212180] rounded-md px-2 py-4 mb-4"
	// 				key={`question-${index}`}
	// 			>
	// 				<p className="flex flex-wrap items-center justify-between">
	// 					<span>{q.question}</span>
	// 					<button
	// 						onClick={(e) => {
	// 							// console.log(e.currentTarget.nextElementSibling);
	// 							e.currentTarget.nextElementSibling.classList.toggle('hidden');
	// 						}}
	// 						className="btn btn-sm btn-outline btn-circle"
	// 					>
	// 						<BsPlus className="text-2xl" />
	// 					</button>
	// 					<span className="w-full rounded-md p-2 mt-[10px] hidden">
	// 						{q.answer}
	// 					</span>
	// 				</p>
	// 			</li>
	// 		))}
	// 	</ul>
	// );

	return (
		<div className="w-[90%] m-auto md:w-1/2">
			{questions.map((q, index) => (
				<React.Fragment key={q.question + index}>
					<div className="collapse collapse-plus outline">
						<input
							type="radio"
							name="my-accordion-3"
							defaultChecked={index == 0}
						/>
						<div className="collapse-title text-xl font-medium">
							{q.question}
						</div>
						<div className="collapse-content">
							<p>{q.answer}</p>
						</div>
					</div>
					<div className="py-2"></div>
				</React.Fragment>
			))}
		</div>
	);
};

export default Faq;
