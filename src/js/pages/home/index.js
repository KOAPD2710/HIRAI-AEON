import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from '../../libs/SplitText';
import { typeOpts } from '../../helper/index';

gsap.registerPlugin(ScrollTrigger);

const home = {
    namespace: "home",
    afterEnter(data) {
        console.log(`enter ${this.namespace}`);

        function homeHero(data) {
            const DOMTarget = $(data.next.container).find('.home-hero')


            const target = {
                logo: DOMTarget.find('.home-hero-logo'),
                mascot: DOMTarget.find('.home-hero-mascot'),
                scope: DOMTarget.find('.home-hero-scope'),
                title: DOMTarget.find('.home-hero-title'),
                labelTop: DOMTarget.find('.home-hero-label.top'),
                labelBot: DOMTarget.find('.home-hero-label.bottom'),
                contentLogo: DOMTarget.find('.home-hero-content-logo'),
            }

            let split = {
                title: new SplitText(target.title, typeOpts.chars),
                labelTop: new SplitText(target.labelTop, typeOpts.chars),
                labelBot: new SplitText(target.labelBot, typeOpts.chars),
            }

            let tl = gsap.timeline()

            tl
                .from(target.logo, {
                    yPercent: 20,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power2.out',
                    clearProps: 'all',
                })
                .from(target.mascot, {
                    yPercent: 10,
                    opacity: 0,
                    duration: .6,
                    ease: 'power2.out',
                    clearProps: 'all',
                }, '>=-.8')
                .from(target.scope, {
                    yPercent: 15,
                    opacity: 0,
                    duration: .8,
                    ease: 'power2.out',
                    clearProps: 'all',
                }, '>=-.4')
                .from(split.title.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .03,
                    duration: .6,
                    onComplete: () => split.title.revert()
                }, '>=-.6')
                .from(target.contentLogo, {
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power2.out'
                }, '<=.5')
                .from(split.labelTop.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .03,
                    duration: .4,
                    onComplete: () => split.labelTop.revert()
                }, '>=-1.3')
                .from(split.labelBot.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .03,
                    duration: .4,
                    onComplete: () => split.labelBot.revert()
                }, '<=.2')

        }
        homeHero(data)

        function homePreamble(data) {
            const DOMTarget = $(data.next.container).find('.home-preamble')



        }
        homePreamble(data)

    },
    beforeLeave(data) {
        console.log(`leave ${this.namespace}`);
    }
}

export default home