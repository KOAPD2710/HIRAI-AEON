import $ from 'jquery';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from '../../libs/SplitText';
import { typeOpts } from '../../helper/index';
import { lenis, startLenis, stopLenis } from '../../global/lenis';

gsap.registerPlugin(ScrollTrigger);

const home = {
    namespace: "home",
    afterEnter(data) {
        console.log(`enter ${this.namespace}`);

        function homeHero(data) {
            stopLenis()
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
                    duration: 1,
                    ease: 'power2.out',
                    clearProps: 'all',
                }, '>=-.4')
                .from(split.title.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .03,
                    duration: .6,
                    onComplete: () => split.title.revert()
                }, '>=-.8')
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
                    onComplete: () => {
                        split.labelBot.revert()
                        startLenis()
                    }
                }, '<=.2')
        }
        homeHero(data)

        function homePreamble(data) {
            const DOMTarget = $(data.next.container).find('.home-preamble')

            const target = {
                client: DOMTarget.find('.home-preamble-content.client'),
                topic: DOMTarget.find('.home-preamble-content.topic'),
                mascot: DOMTarget.find('.home-preamble-mascot'),
                mountain: DOMTarget.find('.home-preamble-mountain'),
            }

            let split = {
                clientTitle: new SplitText(target.client.find('.home-preamble-title'), typeOpts.chars),
                clientDesc: new SplitText(target.client.find('.home-preamble-des'), typeOpts.chars),
                topicTitle: new SplitText(target.topic.find('.home-preamble-title'), typeOpts.chars),
                topicDesc: new SplitText(target.topic.find('.home-preamble-des'), typeOpts.chars),
            }

            let tlTxt = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-preamble-content.client',
                    start: 'top bottom',
                }
            })

            tlTxt
                .from(split.clientTitle.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .03,
                    duration: .6,
                    onComplete: () => split.clientTitle.revert()
                })
                .from(split.clientDesc.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .004,
                    duration: .4,
                    onComplete: () => split.clientDesc.revert()
                }, '>=-.6')
                .from(split.topicTitle.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .03,
                    duration: .6,
                    onComplete: () => split.topicTitle.revert()
                }, '>=-.4')
                .from(split.topicDesc.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .004,
                    duration: .4,
                    onComplete: () => split.topicDesc.revert()
                }, '>=-.6')

            let tlAnimMascot = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-preamble',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: .1,
                },
            })

            tlAnimMascot
                .to(target.mascot, {
                    yPercent: 20,
                    ease: 'none'
                })
                .fromTo(target.mascot.find('.home-preamble-mascot-main img'), {
                    yPercent: -15
                }, {

                    yPercent: 15,
                    ease: 'none'
                }, '<=')
                .to(DOMTarget.find('.home-preamble-mascot-flower.flower1'), {
                    rotate: 20,
                    y: '1rem',
                    x: '-1rem',
                    ease: 'none'
                }, '<=')
                .to(DOMTarget.find('.home-preamble-mascot-flower.flower2'), {
                    rotate: 10,
                    y: '3rem',
                    x: '-1rem',
                    ease: 'none'
                }, '<=')
                .to(DOMTarget.find('.home-preamble-mascot-flower.flower3'), {
                    rotate: 10,
                    y: '1rem',
                    x: '-1rem',
                    ease: 'none'
                }, '<=')


            let tlAnimMountain = gsap.timeline({
                scrollTrigger: {
                    trigger: '.home-preamble-mountain',
                    start: 'top center',
                    scrub: .1,
                }
            })
            tlAnimMountain
                .to(target.mountain, {
                    yPercent: 20,
                    filter: 'blur(.6rem)',
                    ease: 'none'
                })
        }
        homePreamble(data)


        function homeTransCloud(data) {
            const DOMTarget = $(data.next.container).find('.home-transcloud')

            let target = {
                dom: DOMTarget.find('.home-transcloud-wrapper')
            }

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: DOMTarget,
                    start: 'top bottom',
                    end: 'bottom center',
                    scrub: .1,
                }
            })

            tl
                .from(target.dom, {
                    xPercent: -5,
                    filter: 'blur(.6rem)',
                    ease: 'none'
                })

        }
        homeTransCloud(data)


        function homeMascot(data) {
            const DOMTarget = $(data.next.container).find('.home-mascot')

            let target = {
                list: DOMTarget.find('.home-mascot-list')
            }

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: DOMTarget.find('.home-mascot-wrapper'),
                    start: 'top top',
                    endTrigger: '.home-mascot-wrapper',
                    end: 'bottom bottom',
                    scrub: .2,
                }
            })

            tl
                .to(target.list, {
                    yPercent: -10,
                    ease: 'none'
                })

        }
        homeMascot(data)

        function homeInfo(data) {
            const DOMTarget = $(data.next.container).find('.home-info')

            let target = {
                title: DOMTarget.find('.home-info-content-title'),
                desc: DOMTarget.find('.home-info-content-desc'),
                flower: DOMTarget.find('.home-info-mascot-flower'),
                mascot: DOMTarget.find('.home-info-mascot-main')
            }

            let split = {
                title: new SplitText(target.title, typeOpts.chars),
                desc: new SplitText(target.desc, typeOpts.chars)
            }

            let tlTxt = gsap.timeline({
                scrollTrigger: {
                    trigger: target.title,
                    start: 'bottom bottom',
                }
            })

            tlTxt
                .from(split.title.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .03,
                    duration: .6,
                    onComplete: () => split.title.revert()
                })
                .from(split.desc.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .001,
                    duration: .6,
                    onComplete: () => split.desc.revert()
                }, ">=-.3")

            let tlAnimScrub = gsap.timeline({
                scrollTrigger: {
                    trigger: DOMTarget,
                    scrub: .2,
                }
            })

            tlAnimScrub
                .fromTo(target.flower, {
                    yPercent: -11,
                }, {
                    yPercent: 2,
                    xPercent: -2,
                    ease: 'none'
                })
                .from(target.mascot, {
                    yPercent: 20,
                    ease: 'none'
                }, '<=')
        }
        homeInfo(data)

        function homeIdea(data) {
            const DOMTarget = $(data.next.container).find('.home-idea')

            let target = {
                label: DOMTarget.find('.home-idea-label'),
                title: DOMTarget.find('.home-idea-title'),
                desc: DOMTarget.find('.home-idea-desc'),
                main: DOMTarget.find('.home-idea-main'),
            }

            let split = {
                title: new SplitText(target.title, typeOpts.chars),
                desc: new SplitText(target.desc, typeOpts.chars),
            }

            let tlTxt = gsap.timeline({
                scrollTrigger: {
                    trigger: target.label,
                    start: 'bottom bottom',
                }
            })

            tlTxt
                .from(target.label, {
                    yPercent: 50,
                    opacity: 0,
                    ease: 'none',
                    clearProps: 'all'
                })
                .from(split.title.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .02,
                    duration: .6,
                    ease: 'none',
                    onComplete: () => split.title.revert()
                }, '>=-.3')
                .from(split.desc.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .003,
                    duration: .6,
                    onComplete: () => split.desc.revert()
                }, ">=-.3")

            let tlAnimItem = gsap.timeline({
                scrollTrigger: {
                    trigger: target.main,
                    start: 'top top+=75%',
                }
            })

            tlAnimItem
                .from(target.main.find('.home-idea-main-inner'), {
                    y: '10rem',
                    opacity: 0,
                    ease: 'power2.out',
                    stagger: .2,
                    duration: 1.5,
                    clearProps: 'all'
                })


            // Marquee

            let marqueeTarget = {
                marquee: DOMTarget.find('.home-idea-marquee')
            }
            let speed = 100

            let tlMarquee = gsap.timeline({
                scrollTrigger: {
                    trigger: DOMTarget,
                    toggleActions: 'play pause play pause',
                },
                repeat: -1,
            })

            marqueeTarget.marquee.each((idx, el) => {
                let cloner = $(el).find('.home-idea-marquee-inner').clone()

                $(el).append(cloner.clone())
                $(el).append(cloner.clone())
                $(el).append(cloner.clone())


                tlMarquee
                    .to($(el).find('.home-idea-marquee-inner'), {
                        xPercent: (idx % 2 === 0) ? -100 : 100,
                        ease: 'none',
                        duration: $(el).find('.home-idea-marquee-inner').width() / 200
                    }, "<=")

                // $(el).on('mouseenter', (e) => {
                //     marqueeTarget.marquee.removeClass('active blur')
                //     $(el).addClass('active')
                //     marqueeTarget.marquee.not($(el)).addClass('blur')
                // })
                // $(el).on('mouseleave', (e) => {
                //     marqueeTarget.marquee.removeClass('active blur')
                // })

            })
            tlMarquee.seek(28800)
            lenis.on("scroll", (e) => {
                if (e.direction > 0) {
                    gsap.to(tlMarquee, {
                        timeScale: 1,
                        duration: 1,
                        overwrite: true,
                    });
                }
                if (e.direction < 0) {
                    gsap.to(tlMarquee, {
                        timeScale: -1,
                        duration: 1,
                        overwrite: true,
                    });
                }

            });
        }
        homeIdea(data)


        function homeOption(data) {
            const DOMTarget = $(data.next.container).find('.home-option')

            let target = {
                wrapper: DOMTarget.find('.home-option-main-wrapper'),
                title: DOMTarget.find('.home-option-main-title'),
                main: DOMTarget.find('.home-option-main-inner'),
                bg: DOMTarget.find('.home-option-bg'),
            }

            let split = {
                title: new SplitText(target.title, typeOpts.chars)
            }

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: target.wrapper,
                    start: 'top+=25%, bottom',
                }
            })

            tl
                .from(target.wrapper, {
                    yPercent: 10,
                    opacity: 0,
                    duration: .8,
                    ease: 'power2.out',
                    clearProps: 'all'
                })
                .from(split.title.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .01,
                    duration: .3,
                    ease: 'none',
                    onComplete: () => split.title.revert()
                }, '>=-.1')
                .from(target.main.find('img'), {
                    opacity: 0,
                    duration: .6
                }, '>=-.3')

            let tlBg = gsap.timeline({
                scrollTrigger: {
                    trigger: DOMTarget,
                },
                repeat: -1
            })

            tlBg
                .to(target.bg, {
                    '--bg-move': '201rem',
                    ease: 'none',
                    duration: 60
                })
            tlBg.seek(28800)


        }
        homeOption(data)

    },
    beforeLeave(data) {
        console.log(`leave ${this.namespace}`);
    }
}

export default home