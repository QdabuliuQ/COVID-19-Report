import ContentSplit from './ContentSplit'
const components={
	install(Vue){
		Vue.component('ContentSplit',ContentSplit)
  }
}
//判断
if(typeof window !=='undefined' && window.Vue){
	install(window.Vue);
}
 
export default components;