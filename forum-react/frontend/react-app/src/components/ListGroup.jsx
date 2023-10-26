import { useState } from "react";
import PropTypes from "prop-types";

function ListGroup({ items, heading, onSelectItem }) {
	ListGroup.propTypes = {
		items: PropTypes.object,
		heading: PropTypes.string,
		onSelectItem: PropTypes.func,
	};
	const [selectedIndex, setSelectedIndex] = useState(-1);

	return (
		<>
			<h1>{heading}</h1>
			<ul className="list-group">
				{items.map((item, index) => (
					<li
						key={item}
						className={
							selectedIndex === index
								? "list-group-item active"
								: "list-group-item"
						}
						onClick={() => {
							setSelectedIndex(index);
							onSelectItem(item);
						}}
					>
						{item}
					</li>
				))}
			</ul>
		</>
	);
}

export default ListGroup;
