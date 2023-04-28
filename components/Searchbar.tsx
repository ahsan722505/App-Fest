export default function Searchbar() {
	return (
		<div className="flex items-center ">
			<div className="flex border border-purple-200 rounded">
				<input
					type="text"
					className="block w-full px-4 py-2  bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
					placeholder="Search Courses..."
				/>
				<button className="px-4 text-white bg-cyan-700 border-l rounded ">Search</button>
			</div>
		</div>
	);
}
