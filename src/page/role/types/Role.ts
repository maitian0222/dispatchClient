export default interface Role {
  roleId: string;
  roleName: string; // 角色名称
  remark: string; // 角色描述
  createTime: string;
  createTimeFrom: string;
  createTimeTo: string;
  menuId: string;
  modifyTime: string;
}
