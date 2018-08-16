import { TweenMax } from 'gsap';

export default {
	modalToggle: function(target, visible) {
		if (!visible) this.modalLeave(target);
		else this.modalEnter(target);
	},

	modalEnter: (target) => (
		TweenMax.to(target, 0.2, {
			y: 0,
			autoAlpha: 1,
		})
	),

	modalLeave: (target) => (
		TweenMax.to(target, 0.3, {
			y: '+=20',
			autoAlpha: 0
		})
	),

	blink: (target, cb) => (
		TweenMax.fromTo(target, 0.5, {
			backgroundColor: 'rgb(233, 233, 233)',
			onComplete: cb
		}, { backgroundColor: 'rgb(255, 255, 255)' })
	)
};
