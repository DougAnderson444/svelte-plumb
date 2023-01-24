export function clickOutside(node, { enabled: initialEnabled, handleUnselect }) {
	const handleOutsideClick = ({ target }) => {
		if (node !== target && node.parentElement != target.parentElement && !node.contains(target)) {
			handleUnselect();
		}
	};

	function update({ enabled }) {
		if (enabled) {
			window.addEventListener('click', handleOutsideClick);
		} else {
			window.removeEventListener('click', handleOutsideClick);
		}
	}

	update({ enabled: initialEnabled });
	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick);
		}
	};
}
