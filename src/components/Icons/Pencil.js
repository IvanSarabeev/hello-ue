export default function Pencil(props) {
	return (
		<>
			{props.outline ? (
				<svg
					viewBox="0 0 24 24"
					fill="currentColor"
					className={props.className || 'w-6 h-6 mx-auto'}
				>
					<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
				</svg>
			) : (
				<svg
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={props.stroke || '1.6'}
					stroke="currentColor"
					className={props.className || 'w-6 h-6'}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
					/>
				</svg>
			)}
		</>
	)
}

