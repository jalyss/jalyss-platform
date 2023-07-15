import { TfiStatsUp } from 'react-icons/tfi';
import { RiProductHuntLine } from 'react-icons/ri';
import { TbPackageImport } from 'react-icons/tb';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { AiOutlineComment } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';


export const sidebarDataBranch = [
  {
    nameEn: "Dashboard",
    nameAr: "لوحة التحكم",
    path: "charts",
    icon: <TfiStatsUp/>,
    children: [],
  },
  {
    nameEn: "Branches",
    nameAr: "المنتج ",
    path: "branches",
    icon: <RiProductHuntLine/>,
    children: [],
  },
  {
    nameEn: "Supplying",
    nameAr: "توريد",
    path: "suppluing",
    icon: <TbPackageImport/>,
    children: [
      {
        nameEn: "Articles",
        nameAr: "المنتجات ",
        path: "articles",
      },
      {
        nameEn: "Articles by branch",
        nameAr: "المنتجات حسب الفرع",
        path: "articles/articles-by-branch",
      },
      {
        nameEn: "Providers",
        nameAr: "المزوّد",
        path: "provider",
      },
      {
        nameEn: "Category",
        nameAr: "الفئة",
        path: "category",
      },
      {
        nameEn: "Type",
        nameAr: "نوع",
        path: "type",
      },
      {
        nameEn: "Publishing house",
        nameAr: "دار النشر",
        path: "publishing-house",
      },
      {
        nameEn: "Author",
        nameAr: "المؤلف",
        path: "author",
      },
    ],
  },
  {
    nameEn: "Sellings",
    nameAr: "المبيعات",
    path: "Sellings",
    icon: <BiMoneyWithdraw/>,
    children: [
      {
        nameEn: "Orders list",
        nameAr: "الطلبات ",
        path: "commands",
      },
      {
        nameEn: "List of users",
        nameAr: "المستخدم",
        path: "users"
      },
      {
        nameEn: "Client",
        nameAr: "المستخدم",
        path: "client"
      },
      {
        nameEn: "Space",
        nameAr: "الفضاء ",
        path: "space",
      },
      {
      nameEn: "Trainings",
      nameAr: "المبيعات ",
      path: "training",
      },
    ],
  },
  {
    nameEn: "Interactions",
    nameAr: "المنتج ",
    path: "Interactions",
    icon: <AiOutlineComment/>,
    children: [
      {
        nameEn: "Blogs",
        nameAr: "المدونات",
        path: "blogs",
      },
      {
        nameEn: "chat",
        nameAr: "المحادثة",
        path: "chat",
      },
    ],
  },
  {
    nameEn: "Admin settings",
    nameAr: " اعدادات المشرف",
    path: "settings",
    icon: <FiSettings/>,
    children: [
      {
        nameEn: "Employee",
        nameAr: "الموظف",
        path: "employee",
      },
      {
        nameEn: "Roles",
        nameAr: "الادوار",
        path: "role",
      },
    ],
  }

];
