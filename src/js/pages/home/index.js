import $ from 'jquery';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';
import { SplitText } from '../../libs/SplitText';
import { inView, lerp, parseRem, pointerCurr, rotXGetter, rotXSetter, rotYGetter, rotYSetter, typeOpts, xGetter, xSetter, yGetter, ySetter } from '../../helper/index';

// gsap.registerPlugin(ScrollTrigger);

const home = {
    namespace: "home",
    afterEnter(data) {
        console.log(`enter ${this.namespace}`);

    },
    beforeLeave(data) {
        console.log(`leave ${this.namespace}`);
    }
}

export default home