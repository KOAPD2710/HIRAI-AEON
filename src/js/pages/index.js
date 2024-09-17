import $ from "jquery";
import barba from '@barba/core';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import InitResize from "../global/resizePage";
import { lenis, initLenis } from "../global/lenis";

import InitHeader from "../global/header";

import home from './home/index';

const VIEWS = [home];

const initScriptPage = () => {
    function ScrollTop() {
        lenis.scrollTo(0, {
            force: true,
            immediate: true
        })
    }
    barba.init({
        preventRunning: true,
        transitions: [{
            name: 'opacity-transition',
            sync: true,
            once(data) {
                initLenis()
                InitHeader()
                InitResize()
                ScrollTop()

                // window.onbeforeunload = function () {
                //     ScrollTop()
                // }
            },
            leave(data) {
                gsap.to(data.current.container, {
                    opacity: 0,
                    duration: 1,
                });
            },
            afterLeave(data) {
                ScrollTop()
                if (window.animationFrameId) {
                    cancelAnimationFrame(window.animationFrameId);
                    window.animationFrameId = null;
                }
            },
            enter(data) {
                gsap.from(data.next.container, {
                    opacity: 0,
                    duration: 1,
                });
            },
        }],
        views: VIEWS
    });
}

export {
    initScriptPage
};