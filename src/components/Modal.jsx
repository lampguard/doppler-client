const Modal = ({ id, children, withClose }) => {
	return (
		<>
			<dialog id={id} className="modal">
				<div className="modal-box">
					{children}
					{withClose && (
						<div className="modal-action">
							<form method="dialog">
								<button className="btn">Close</button>
							</form>
						</div>
					)}
				</div>

				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
};

export default Modal;
