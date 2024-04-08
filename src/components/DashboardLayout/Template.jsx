import { AiFillBell, AiFillSetting } from 'react-icons/ai';

/**
 * @type {React.FC<{
 *  children?: React.ReactElement;
 *  title: string;
 * }>} Layout
 */
const Layout = ({ children, title }) => {
	return (
		<div className="container font-[300]">
			<div className="border-b border-[#ccc] flex justify-between items-end pt-6 pb-3 px-5">
				<p className="text-lg text-black">{title}</p>
				<div className="flex w-[50%] items-center justify-end">
					<span>
						<AiFillSetting className="text-2xl" />
					</span>
					<span className="px-6"></span>
					<span className="relative">
						<AiFillBell className="text-2xl"></AiFillBell>
						<span className="absolute top-0 right-0">
							<span class="relative flex h-3 w-3">
								<span class="animate-[ping_2s_infinite] absolute inline-flex h-full w-full rounded-full bg-theme opacity-75 left-[-2px]  top-[-2px]"></span>
								<span class="relative rounded-full h-2 w-2 bg-theme text-white text-xs text-center"></span>
							</span>
						</span>
					</span>
					<span className="px-6"></span>
					<span>
						<img
							src="https://ui-avatars.com/api/?name=John+Doe&background=003AFF&color=fff"
							alt=""
							className="rounded-full w-[50px] inline"
						/>
						<span className="px-[6px]"></span>
						<p className="inline">John Doe</p>
					</span>
				</div>
			</div>
			{children}
		</div>
	);
};

export default Layout;
