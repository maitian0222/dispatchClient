export default interface Resource {
  menuId: string;
  menuName: string;
  type: string;
  path: string;
  orderNum: string;
  visiable: string;
  icon: string;
  children?: [];
}
