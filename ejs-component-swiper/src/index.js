import "./index.less";
import Swiper from "swiper";

export default class EjsSwiper {
  constructor() {
    this.swiperSlider();
    this.registerEvents();
  }
  swiperSlider() {
    let swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      autoplay: 2500,
      loop: true
    });
  }
  registerEvents() {
    $("body").on("click",".J_btn",function() {
      alert("确定去购买了吗？");
    });
  }
}