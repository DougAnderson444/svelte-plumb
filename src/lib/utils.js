// get data nodes value from matching node.id
export const generateLinkLabel = (nodes, sourceID, targetID = false) => {
	const match = nodes.find((el) => el.id == sourceID);
	if (!match || !match.value) return '';
	if (!targetID) return match.value + ' to';

	const match2 = nodes.find((el) => el.id == targetID);
	if (!match2) return match.value;
	return `${match.value} to ${match2.value}`;
};
