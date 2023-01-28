// @ts-nocheck
import PointerTracker from '@douganderson444/pointer-tracker';

export function grabable(
	nodeEl,
	{ nodeData = {}, removeCurrentNode = () => null, scale = 1 } = {}
) {
	let top = 0;
	let left = 0;

	let shiftX;
	let shiftY;

	let pointerTracker = new PointerTracker(nodeEl, {
		start(pointer, event) {
			left = null;
			top = null;
			// if (event.target !== nodeEl && event.target.parentNode !== nodeEl) return false; // only move the top HTML Node
			if (event.target instanceof HTMLInputElement || event.target.isContentEditable) return false; // skip editable elements
			event.preventDefault();
			event.stopPropagation();

			nodeEl.dispatchEvent(
				new CustomEvent('started', {
					detail: {}
				})
			);

			// capture the inital pointer offset within the event target
			shiftX = event.clientX - nodeEl.getBoundingClientRect().left || 0;
			shiftY = event.clientY - nodeEl.getBoundingClientRect().top || 0;

			// get current position
			left = parseFloat(getComputedStyle(nodeEl)['left'].replace('px', '')) || 0;
			top = parseFloat(getComputedStyle(nodeEl)['top'].replace('px', '')) || 0;

			return true;
		},
		move(previousPointers, changedPointers, event) {
			event.preventDefault();
			event.stopPropagation();

			nodeEl.style.cursor = 'grabbing';

			// auto scroll at edges
			if (pointerTracker.currentPointers[0].clientY > document.body.clientHeight - 20)
				window.scrollBy(0, 20);

			if (pointerTracker.currentPointers[0].clientY < 20) window.scrollBy(0, -20);
			if (pointerTracker.currentPointers[0].clientX > document.body.clientWidth - 20)
				window.scrollBy(20, 0);

			if (pointerTracker.currentPointers[0].clientX < 20) window.scrollBy(-20, 0);

			left = left + (pointerTracker.currentPointers[0].pageX - previousPointers[0].pageX) / scale;
			top = top + (pointerTracker.currentPointers[0].pageY - previousPointers[0].pageY) / scale;

			nodeData.x = left;
			nodeData.y = top;

			// update position in node Element
			// if not over dropzone
			nodeEl.dispatchEvent(
				new CustomEvent('move', {
					detail: {
						...nodeData,
						x: left,
						y: top,
						overDropZone: overDropZone(pointerTracker.currentPointers[0])
					}
				})
			);
		},
		end(pointer, event, cancelled) {
			// temporarily reset to original position so you can get elementFromPoint underneath it
			nodeEl.style.left = 0;
			nodeEl.style.top = 0;

			let zone = document
				.elementFromPoint(pointer.clientX, pointer.clientY)
				?.closest('[data-dropzone]');

			nodeEl.style.cursor = 'auto';

			// handle dropped on self (no data-dropzone found)
			if (!overDropZone(pointer, zone)) {
				// console.log('dropped on self');
				// handle relative drop on self,
				nodeEl?.dispatchEvent(
					new CustomEvent('end', {
						detail: {
							...nodeData,
							// set left and top back to last position since it was cleared (above)
							x: left,
							y: top
						}
					})
				);
				return;
			}

			// remove from old parent
			removeCurrentNode();

			// add to new zone
			zone.dispatchEvent(
				new CustomEvent('addChild', {
					detail: {
						nodeData: {
							...nodeData,
							x: pointer.clientX - shiftX - zone.getBoundingClientRect().left,
							y: pointer.clientY - shiftY - zone.getBoundingClientRect().top
						}
					}
				})
			);
		},
		avoidPointerEvents: true,
		eventListenerOptions: { capture: false }
	});

	function overDropZone(pointer, zone = null) {
		if (!zone)
			zone = document
				.elementFromPoint(pointer.clientX, pointer.clientY)
				?.closest('[data-dropzone]');

		// nodeEl is grabable <Node>
		// zone is <Group> dropzone
		// each <Node> has a parent that is a <Group> dropzone
		// if <Node> is dropped on current <Group> dropzone, return false
		return (
			!!zone && // dropzone exists
			zone != nodeEl && // not dropped on self
			zone.parentNode != nodeEl && // not dropped on parent
			zone.parentNode?.id != nodeEl?.id && // sometime nodeEl disappeara and is removed from the DOM
			!nodeEl.contains(zone) &&
			zone != nodeEl.parentNode.closest('[data-dropzone]') // not dropped on current zone
		);
	}

	return {
		update(params) {
			// the value of `bar` has changed
			({ nodeData, removeCurrentNode, scale } = params);
		},

		destroy() {
			// the node has been removed from the DOM
			pointerTracker.stop();
		}
	};
}
