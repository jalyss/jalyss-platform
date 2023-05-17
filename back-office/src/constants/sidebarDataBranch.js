export const sidebarDataBranch = [
  {
    nameEn: "Dashboard",
    nameAr: "لوحة التحكم",
    path: "charts",
    children: [],
  },
  {
    nameEn: "Roles",
    nameAr: "الادوار",
    path: "role",
    children: [
      {
        nameEn: "User",
        nameAr: "المستخدم",
        path: "user",
      },
      {
        nameEn: "Employee",
        nameAr: "الموظف",
        path: "employee",
      },
    ],
  },
  {
    nameEn: "Orders",
    nameAr: "الطلبات",
    path: "command",
    children: [
      {
        nameEn: "All orders",
        nameAr: "كل الطلبات",
        path: "command",
        children: [],
      },
      {
        nameEn: "Non deliverd orders",
        nameAr: "طلبات لم يتم تسليمها",
        path: "command",
        children: [],
      },
      {
        nameEn: "Delivered orders",
        nameAr: "طلبات تم تسليمها",
        path: "command",
        children: [],
      },
    ],
  },
  {
    nameEn: "Article",
    nameAr: "المنتج ",
    path: "articles",
    children: [
      {
        nameEn: "Article by branch",
        nameAr: "المنتجات حسب الفرع",
        path: "articles-by-branch",
      },
    ],
  },
];
