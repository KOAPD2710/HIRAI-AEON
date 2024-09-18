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
        ScrollTrigger.create({
            trigger: $(data.next.container).find('.home-preamble'),
            start: 'top bottom+=20%',
            once: true,
            onEnter: () => homePreamble(data)
        })

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
                    scrub: 2,
                }
            })

            tl
                .from(target.dom, {
                    xPercent: -5,
                    filter: 'blur(.6rem)',
                    ease: 'none'
                })

        }
        ScrollTrigger.create({
            trigger: $(data.next.container).find('.home-transcloud'),
            start: 'top bottom+=20%',
            once: true,
            onEnter: () => homeTransCloud(data)
        })

        function homeMascot(data) {
            const DOMTarget = $(data.next.container).find('.home-mascot')

            let target = {
                list: DOMTarget.find('.home-mascot-list'),
                items: DOMTarget.find('.home-mascot-item'),
            }

            if ($(window).width() > 767) {
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: DOMTarget.find('.home-mascot-wrapper'),
                        start: 'top bottom',
                        endTrigger: '.home-mascot-wrapper',
                        end: 'bottom bottom',
                        scrub: .2,
                    }
                })

                tl
                    .fromTo(target.list, {
                        yPercent: -30,
                    }, {
                        yPercent: -10,
                        ease: 'power2.out'
                    })

                let tlActive = gsap.timeline({
                    scrollTrigger: {
                        trigger: DOMTarget,
                        toggleActions: 'play pause play pause',
                    },
                    repeat: -1
                })

                target.items.each((idx, el) => {
                    tlActive.to({}, {
                        onStart: () => {
                            target.items.removeClass('active');
                            $(el).addClass('active');
                        },
                        duration: 1.2
                    });
                })
                // tlActive.seek(29880);

                target.items.on('pointerenter', function (e) {
                    tlActive.pause()
                    target.items.removeClass('active')

                    $(this).addClass('active')
                })
                target.items.on('pointerleave', function (e) {
                    target.items.removeClass('active')
                    tlActive.play()
                })
            } else {
                target.items.addClass('active');
            }

        }
        ScrollTrigger.create({
            trigger: $(data.next.container).find('.home-mascot'),
            start: 'top bottom+=20%',
            once: true,
            onEnter: () => homeMascot(data)
        })

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
                    start: 'bottom bottom-=10%',
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
        ScrollTrigger.create({
            trigger: $(data.next.container).find('.home-info'),
            start: 'top bottom+=20%',
            once: true,
            onEnter: () => homeInfo(data)
        })

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
                    start: 'bottom bottom-=10%',
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
                        duration: $(el).find('.home-idea-marquee-inner').width() / speed
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
            let easeTL = "circ.out";

            tlMarquee.seek(28800);
            lenis.on("scroll", (e) => {
                if (e.direction > 0) {
                    gsap.to(tlMarquee, {
                        timeScale: 1,
                        duration: 1,
                        ease: easeTL,
                        overwrite: true,
                    });
                }
                if (e.direction < 0) {
                    gsap.to(tlMarquee, {
                        timeScale: -1,
                        duration: 1,
                        ease: easeTL,
                        overwrite: true,
                    });
                }

            });
        }
        ScrollTrigger.create({
            trigger: $(data.next.container).find('.home-idea'),
            start: 'top bottom+=20%',
            once: true,
            onEnter: () => homeIdea(data)
        })

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
                    toggleActions: 'play pause play pause',
                },
                repeat: -1
            })

            // tlBg
            //     .to(target.bg, {
            //         '--bg-move': '201rem',
            //         ease: 'none',
            //         duration: 60
            //     })
            // tlBg.seek(28800)
        }
        ScrollTrigger.create({
            trigger: $(data.next.container).find('.home-option'),
            start: 'top bottom+=20%',
            once: true,
            onEnter: () => homeOption(data)
        })

        function homePose(data) {
            const DOMTarget = $(data.next.container).find('.home-pose')

            let target = {
                title: DOMTarget.find('.home-pose-title'),
                main: DOMTarget.find('.home-pose-main'),
                tail: DOMTarget.find('.home-pose-tail')
            }

            let split = {
                title: new SplitText(target.title, typeOpts.chars)
            }

            let tlTxt = gsap.timeline({
                scrollTrigger: {
                    trigger: target.title,
                    start: 'bottom bottom-=10%',
                }
            })

            tlTxt
                .from(split.title.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .015,
                    duration: .4,
                    ease: 'none',
                    onComplete: () => split.title.revert()
                })
                .from(target.tail.find('img'), {
                    yPercent: 10,
                    opacity: 0,
                    duration: 1.6,
                    ease: 'power2.out',
                    clearProps: 'all'
                }, '>=-.2')
                .from(target.main, {
                    xPercent: -2,
                    opacity: 0,
                    ease: 'power2.out',
                    duration: 1,
                    clearProps: 'all'
                }, '>=-1.6')

            let tlAnimTail = gsap.timeline({
                scrollTrigger: {
                    trigger: DOMTarget,
                    scrub: .5,
                }
            })

            tlAnimTail
                .fromTo(target.tail, {
                    yPercent: -5,
                }, {
                    yPercent: 10,
                    xPercent: -5,
                    ease: 'none'
                })

        }
        ScrollTrigger.create({
            trigger: $(data.next.container).find('.home-pose'),
            start: 'top bottom+=20%',
            once: true,
            onEnter: () => homePose(data)
        })

        function homeAnatomy(data) {
            const DOMTarget = $(data.next.container).find('.home-anatomy')

            let target = {
                title: DOMTarget.find('.home-anatomy-title'),
                main: DOMTarget.find('.home-anatomy-main'),
                mascot: DOMTarget.find('.home-anatomy-mascot'),
                items: DOMTarget.find('.home-anatomy-item'),
                pattern: DOMTarget.find('.home-anatomy-pattern'),
                flower: DOMTarget.find('.home-anatomy-flower'),
            }

            let split = {
                title: new SplitText(target.title.find('h1'), typeOpts.chars)
            }

            let tlTxt = gsap.timeline({
                scrollTrigger: {
                    trigger: target.title,
                    start: 'bottom bottom-=10%',
                }
            })

            tlTxt
                .from(split.title.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .01,
                    duration: .6,
                    ease: 'power2.out',
                    onComplete: () => split.title.revert()
                })
                .from(target.title.find('.home-anatomy-title-fade'), {
                    opacity: 0,
                    yPercent: -30,
                    duration: 1,
                    ease: 'power2.out',
                    clearProps: 'all'
                }, '>=-.7')

            let tlMain = gsap.timeline({
                scrollTrigger: {
                    trigger: target.main,
                    start: 'top top+=80%',
                }
            })
            tlMain
                .from(target.mascot, {
                    yPercent: 5,
                    opacity: 0,
                    ease: 'power1.out',
                    duration: .6,
                    clearProps: 'all'
                })
                .from(target.pattern, {
                    y: '5rem',
                    opacity: 0,
                    ease: 'power1.out',
                    duration: .6,
                    clearProps: 'all'
                }, '>=-.4')
                .from(target.items, {
                    y: '5rem',
                    opacity: 0,
                    stagger: .08,
                    ease: 'power2.out',
                    duration: .6,
                    clearProps: 'all'
                }, '>=-.4')

            let tlAnimScrub = gsap.timeline({
                scrollTrigger: {
                    trigger: target.main,
                    start: 'top bottom',
                    scrub: .2,
                }
            })

            tlAnimScrub
                .to(target.main, {
                    y: '2rem',
                    ease: 'none'
                })
                .from(target.pattern.find('img'), {
                    yPercent: -10,
                    ease: 'none'
                }, "<=")

            let tlAnimFlower = gsap.timeline({
                scrollTrigger: {
                    trigger: DOMTarget,
                    scrub: .2,
                }
            })

            tlAnimFlower
                .to(target.flower.filter('.flower1'), {
                    yPercent: 15,
                    xPercent: 3,
                    filter: 'blur(.2rem)',
                    ease: 'none'
                })
                .from(target.flower.filter('.flower2'), {
                    yPercent: -20,
                    xPercent: -3,
                    filter: 'blur(.1rem)',
                    ease: 'power2.inOut'
                }, "<=")
        }
        ScrollTrigger.create({
            trigger: $(data.next.container).find('.home-anatomy'),
            start: 'top bottom+=20%',
            once: true,
            onEnter: () => homeAnatomy(data)
        })

        function homeSticker(data) {
            const DOMTarget = $(data.next.container).find('.home-sticker')

            let target = {
                cloud: DOMTarget.find('.home-sticker-cloud'),
                title: DOMTarget.find('.home-sticker-title'),
                paper: DOMTarget.find('.home-sticker-papper'),
                paperItems: DOMTarget.find('.home-sticker-papper-main-item'),
                circle: DOMTarget.find('.home-sticker-circle'),
                mascot: DOMTarget.find('.home-sticker-mascot'),
                showcase: DOMTarget.find('.home-sticker-showcase'),
                showcaseItems: DOMTarget.find('.home-sticker-showcase-item'),
                showcaseMain: DOMTarget.find('.home-sticker-showcase-main'),
            }

            let split = {
                title: new SplitText(target.title, typeOpts.chars)
            }

            let tlCloud1 = gsap.timeline({
                scrollTrigger: {
                    trigger: target.cloud.filter('.cloud-1'),
                    scrub: 2,
                }
            })
            tlCloud1
                .fromTo(target.cloud.filter('.cloud-1'), {
                    xPercent: -10,
                    filter: 'blur(.1rem)',
                }, {
                    xPercent: 5,
                    filter: 'blur(.3rem)',
                    ease: 'none'
                })

            let tlHead = gsap.timeline({
                scrollTrigger: {
                    trigger: target.title,
                    start: 'bottom bottom-=10%',
                }
            })
            tlHead
                .from(split.title.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .01,
                    duration: .6,
                    ease: 'power1.out',
                    onComplete: () => split.title.revert()
                })
                .from(target.paper, {
                    yPercent: 10,
                    opacity: 0,
                    ease: 'power1.out',
                    duration: .6,
                    clearProps: 'all'
                }, '>=-.3')
                .from(target.circle, {
                    yPercent: 10,
                    opacity: 0,
                    ease: 'power1.out',
                    clearProps: 'all'
                }, '>=-.2')
                .from(target.paperItems, {
                    yPercent: 5,
                    opacity: 0,
                    stagger: .08,
                    duration: .8,
                    ease: 'sine.out',
                    clearProps: 'all'
                }, '>=-.5')
                .from(target.mascot, {
                    yPercent: 5,
                    opacity: 0,
                    duration: .8,
                    ease: 'sine.out',
                    clearProps: 'all'
                }, '>=-.8')


            let tlCloud2 = gsap.timeline({
                scrollTrigger: {
                    trigger: target.cloud.filter('.cloud-2'),
                    scrub: 2,
                }
            })
            tlCloud2
                .fromTo(target.cloud.filter('.cloud-2'), {
                    xPercent: -5,
                }, {
                    xPercent: 10,
                    ease: 'none'
                })

            let tlShowcase = gsap.timeline({
                scrollTrigger: {
                    trigger: target.showcase,
                    start: 'top bottom-=40%',
                }
            })

            tlShowcase
                .from(target.showcaseItems, {
                    yPercent: 10,
                    opacity: 0,
                    stagger: {
                        from: 'center',
                        amount: .2,
                        ease: 'power1.out',
                    },
                    clearProps: 'all'
                })
                .from(target.showcaseMain, {
                    yPercent: 10,
                    opacity: 0,
                    clearProps: 'all'
                }, '>=-.3')


            let tlCloud3 = gsap.timeline({
                scrollTrigger: {
                    trigger: target.cloud.filter('.cloud-3'),
                    scrub: 2,
                }
            })

            tlCloud3
                .fromTo(target.cloud.filter('.cloud-3'), {
                    xPercent: 5,
                }, {
                    xPercent: -5,
                    filter: 'blur(.2rem)',
                    ease: 'none'
                })
                .to(DOMTarget.find('.home-sticker-mask-bot'), {
                    '--bg-move': '-40rem',
                    ease: 'none'
                }, '<=')

        }
        ScrollTrigger.create({
            trigger: $(data.next.container).find('.home-sticker'),
            start: 'top bottom+=20%',
            once: true,
            onEnter: () => homeSticker(data)
        })

        function home3dSticker(data) {
            const DOMTarget = $(data.next.container).find('.home-sticker3d')

            let target = {
                grid: DOMTarget.find('.home-sticker3d-grid'),
                allItems: DOMTarget.find('.home-sticker3d-grid-item'),
                maskTop: DOMTarget.find('.home-sticker3d-mask'),

            }

            if ($(window).width() > 991) {
                target.grid.empty();
                target.grid.addClass('isDesktop');

                let columns = 4;

                for (i = 0; i < columns; i++) {

                    let newGridInner = $('<div>').addClass('home-sticker3d-grid-inner');

                    let shuffledItems = Array.from(target.allItems).sort(() => 0.5 - Math.random());
                    const newColumn = shuffledItems.slice(0, 8);

                    $(newColumn).each((idx, el) => newGridInner.append($(el).clone()));

                    target.grid.append(newGridInner);
                }


                let tlInner = gsap.timeline({
                    scrollTrigger: {
                        trigger: DOMTarget,
                        scrub: 1,
                    }
                })


                tlInner
                    .to(target.grid.find('.home-sticker3d-grid-inner:nth-child(odd)'), {
                        yPercent: 10,
                        ease: 'none'
                    })
                    .to(target.grid.find('.home-sticker3d-grid-inner:nth-child(even)'), {
                        yPercent: -10,
                        ease: 'none'
                    }, "<=")
            }

            let tlMaskTop = gsap.timeline({
                scrollTrigger: {
                    trigger: target.maskTop,
                    scrub: 2,
                }
            })

            tlMaskTop
                .to(target.maskTop, {
                    '--bg-move': '10rem',
                    ease: 'none'
                })

        }
        ScrollTrigger.create({
            trigger: $(data.next.container).find('.home-sticker3d'),
            start: 'top bottom+=20%',
            once: true,
            onEnter: () => home3dSticker(data)
        })

        function homeShowcase(data) {
            const DOMTarget = $(data.next.container).find('.home-showcase')

            let target = {
                maskTop: DOMTarget.find('.home-showcase-mask'),
                main: DOMTarget.find('.home-showcase-main'),
                flower: DOMTarget.find('.home-showcase-flower'),
                flowerSm: DOMTarget.find('.home-showcase-flower.flower-sm'),
                cloud: DOMTarget.find('.home-showcase-cloud'),
            }

            let tlMaskTop = gsap.timeline({
                scrollTrigger: {
                    trigger: target.maskTop,
                    scrub: 2,
                }
            })

            tlMaskTop
                .from(target.maskTop, {
                    '--bg-move': '-15rem',
                    ease: 'none'
                })

            let tlMain = gsap.timeline({
                scrollTrigger: {
                    trigger: target.main,
                    scrub: 2,
                }
            })
            tlMain
                .to(target.main, {
                    y: '7.5rem',
                    ease: 'none'
                })
                .to(target.flower.filter('.flower1'), {
                    y: '12.5rem',
                    filter: 'blur(.1rem)',
                    ease: 'none'
                }, '<=')
                .to(target.flower.filter('.flower2'), {
                    y: '6.5rem',
                    filter: 'blur(.2rem)',
                    ease: 'none'
                }, '<=')
                .to(target.flowerSm.filter('.flower-sm-1'), {
                    y: '-1rem',
                    ease: 'none'
                }, '<=')
                .to(target.flowerSm.filter('.flower-sm-2'), {
                    y: '1rem',
                    ease: 'none'
                }, '<=')
                .to(target.flowerSm.filter('.flower-sm-3'), {
                    y: '2rem',
                    ease: 'none'
                }, '<=')
                .to(target.cloud.filter('.cloud-1'), {
                    xPercent: '10',
                    filter: 'blur(.2rem)',
                    ease: 'none'
                }, '<=')
                .to(target.cloud.filter('.cloud-2'), {
                    xPercent: '-5',
                    filter: 'blur(.2rem)',
                    ease: 'none'
                }, '<=')


        }
        ScrollTrigger.create({
            trigger: $(data.next.container).find('.home-showcase'),
            start: 'top bottom+=20%',
            once: true,
            onEnter: () => homeShowcase(data)
        })

        function homeAdap(data) {
            const DOMTarget = $(data.next.container).find('.home-adap')

            let target = {
                titleWrapper: DOMTarget.find('.home-adap-title-wrapper'),
                cupWrapper: DOMTarget.find('.home-adap-cup-wrapper'),
                bagWrapper: DOMTarget.find('.home-adap-bag-wrapper'),
                lanyard: DOMTarget.find('.home-adap-lanyard'),
            }
            let split = {
                title: new SplitText(target.titleWrapper.find('.home-adap-title'), typeOpts.chars)
            }

            let tlTitle = gsap.timeline({
                scrollTrigger: {
                    trigger: target.titleWrapper,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                }
            })

            tlTitle
                .from(target.titleWrapper, {
                    y: '5rem',
                    ease: 'none'
                })

            gsap.from(split.title.chars, {
                scrollTrigger: {
                    trigger: target.titleWrapper,
                },
                yPercent: 50,
                opacity: 0,
                stagger: .05,
                duration: .6,
                onComplete: () => split.title.revert()
            })

            let tlCup = gsap.timeline({
                scrollTrigger: {
                    trigger: target.cupWrapper,
                    scrub: 1,
                }
            })
            tlCup
                .from(target.cupWrapper.find('.home-adap-cup'), {
                    scale: 1.2,
                    yPercent: 10,
                    ease: 'power2.out'
                })

            let tlBag = gsap.timeline({
                scrollTrigger: {
                    trigger: target.bagWrapper,
                    scrub: 1.5,
                    // markers: true
                }
            })

            tlBag
                .from(target.bagWrapper.find('.home-adap-bag img'), {
                    yPercent: -5,
                    scale: 1.1,
                    ease: 'power1.out'
                }, '<=')
                .from(target.lanyard.filter('.lanyard-1'), {
                    yPercent: -5,
                    xPercent: -5,
                    ease: 'power1.out'
                }, '<=')
                .from(target.lanyard.filter('.lanyard-2'), {
                    yPercent: -10,
                    xPercent: -5,
                    ease: 'power1.out'
                }, '<=')

        }
        ScrollTrigger.create({
            trigger: $(data.next.container).find('.home-adap'),
            start: 'top bottom+=20%',
            once: true,
            onEnter: () => homeAdap(data)
        })

        function homePoster(data) {
            const DOMTarget = $(data.next.container).find('.home-poster')

            let target = {
                flower: DOMTarget.find('.home-poster-flower'),
                mask: DOMTarget.find('.home-poster-mask'),
                main: DOMTarget.find('.home-poster-main'),
                posterSm: DOMTarget.find('.home-poster-sm'),
            }

            let tlFlower = gsap.timeline({
                scrollTrigger: {
                    trigger: DOMTarget,
                    scrub: 1,
                }
            })

            tlFlower
                .to(target.flower.filter('.flower-2'), {
                    y: '5rem',
                    filter: 'blur(.3rem)',
                    opacity: .8,
                    ease: 'none'
                })

            let tlMask = gsap.timeline({
                scrollTrigger: {
                    trigger: target.mask,
                    scrub: 1,
                }
            })

            tlMask
                .to(target.mask, {
                    '--bg-move': '-20rem',
                    ease: 'none'
                })

            target.posterSm.each((idx, el) => {
                $(el).css('justifyContent', 'start')

                // if ($(el).hasClass('left')) {
                //     $(el).css('justifyContent', 'start')
                // } else if ($(el).hasClass('right')) {
                //     $(el).css('justifyContent', 'end')
                // }
                let cloner = $(el).find('.home-poster-sm-inner').clone()

                $(el).append(cloner)
            })

            let tlInner = gsap.timeline({
                scrollTrigger: {
                    trigger: target.main,
                    scrub: 1,
                }
            })

            const offset = 60;
            tlInner
                .to(target.posterSm.filter('.left').find('.home-poster-sm-inner'), {
                    y: `-${offset}rem`,
                    ease: 'none'
                })
                .to(target.posterSm.filter('.right').find('.home-poster-sm-inner'), {
                    y: `-${offset}rem`,
                    ease: 'none'
                }, '<=')

        }
        ScrollTrigger.create({
            trigger: $(data.next.container).find('.home-poster'),
            start: 'top bottom+=20%',
            once: true,
            onEnter: () => homePoster(data)
        })

        function homeFoot(data) {
            const DOMTarget = $(data.next.container).find('.home-foot')

            let target = {
                title: DOMTarget.find('.home-foot-title'),
                label: DOMTarget.find('.home-foot-label'),
                logo: DOMTarget.find('.home-foot-logo'),
                cloud: DOMTarget.find('.home-foot-cloud'),
                mountain: DOMTarget.find('.home-foot-mountain'),
            }
            let split = {
                title: new SplitText(target.title, typeOpts.chars),
                labelTop: new SplitText(target.label.filter('.top'), typeOpts.chars),
                labelBot: new SplitText(target.label.filter('.bottom'), typeOpts.chars),
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
                    stagger: .08,
                    duration: .6,
                    ease: 'power2.out',
                    onComplete: () => split.title.revert()
                })
                .from(target.logo, {
                    yPercent: 10,
                    opacity: 0,
                    duration: 1,
                    ease: 'power2.out',
                    clearProps: 'all'
                }, '>=-.5')
                .from(split.labelTop.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .05,
                    duration: .4,
                    ease: 'power2.out',
                    onComplete: () => split.labelTop.revert()
                }, '>=-.8')
                .from(split.labelBot.chars, {
                    yPercent: 50,
                    opacity: 0,
                    stagger: .025,
                    duration: .3,
                    ease: 'power2.out',
                    onComplete: () => split.labelBot.revert()
                }, '>=-.5')

            let tlObject = gsap.timeline({
                scrollTrigger: {
                    trigger: target.cloud.filter('.cloud-1'),
                    start: 'top+=20% bottom',
                    endTrigger: DOMTarget,
                    end: 'bottom bottom',
                    scrub: 2,
                }
            })

            tlObject
                .from(target.mountain, {
                    yPercent: 50,
                    filter: 'blur(.2rem)',
                    ease: 'power2.in'
                })
                .fromTo(target.cloud.filter('.cloud-1'), {
                    x: '3rem',
                }, {
                    x: '-10rem',
                    filter: 'blur(.2rem)',
                    ease: 'none'
                }, '<=')


        }
        ScrollTrigger.create({
            trigger: $(data.next.container).find('.home-foot'),
            start: 'top bottom+=20%',
            once: true,
            onEnter: () => homeFoot(data)
        })
    },
    beforeLeave(data) {
        console.log(`leave ${this.namespace}`);
    }
}

export default home