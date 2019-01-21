import { TweenLite } from 'gsap';

export default {
	modalToggle: function(target, visible) {
		if (!visible) this.modalLeave(target);
		else this.modalEnter(target);
	},

	modalEnter: (target) => (
		TweenLite.to(target, 0.2, {
			y: 0,
			autoAlpha: 1,
		})
	),

	modalLeave: (target) => (
		TweenLite.to(target, 0.3, {
			y: '+=20',
			autoAlpha: 0
		})
	),

	blink: (target, cb) => (
		TweenLite.fromTo(target, 0.75, {
			backgroundColor: 'rgb(233, 233, 233)',
			onComplete: () => {setTimeout(cb, 200)}
		}, { backgroundColor: 'rgb(255, 255, 255)' })
	)
};
