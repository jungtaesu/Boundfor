// globals.css 모듈 선언
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}