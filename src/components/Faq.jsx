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
		question: 'How is my data secured?',
	},
	{
		question: 'How is my data secured?',
	},
	{
		question: 'How is my data secured?',
	},
	{
		question: 'How is my data secured?',
	},
];

const Faq = () => {
	return (
		<ul className="w-[90%] md:w-1/2 m-auto">
			{questions.map((q, index) => (
				<li className="border border-[#21212180] rounded-md px-2 py-4 mb-4" key={`question-${index}`}>
					<p className="flex flex-wrap items-center justify-between">
						<span>{q.question}</span>
						<button
							onClick={(e) => {
								// console.log(e.currentTarget.nextElementSibling);
								e.currentTarget.nextElementSibling.classList.toggle('hidden');
							}}
							className="btn btn-sm btn-circle border border-[#21212180] hover:bg-[#ccccccae]"
						>
							<BsPlus className="text-2xl" />
						</button>
						<span className="w-full bg-gray-100 rounded-md p-2 mt-[10px] hidden">
							{q.answer}
						</span>
					</p>
				</li>
			))}
		</ul>
	);
};

export default Faq;
