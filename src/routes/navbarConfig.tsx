import React, { ReactNode } from "react";
import { BiAlignLeft } from "react-icons/bi";
import { RoutePermittedRole } from "../shared/constants/AppConst";
import IntlMessages from "../@crema/utility/IntlMessages";

export interface RouterConfigData {
  id: string;
  title: any;
  messageId: string;
  icon?: string | ReactNode;
  type: "item" | "group" | "collapse" | "divider";
  children?: RouterConfigData[];
  permittedRole?: RoutePermittedRole;
  color?: string;
  url?: string;
  exact?: boolean;
  count?: number;
}

const routesConfig: RouterConfigData[] = [
  {
    id: "app",
    title:  <IntlMessages id="sideNav.Dashboard" />,
    messageId: "Dashboard",
    type: "item",
    url: "/admin/dashboard",
  
  },
  {
    id: "Players",
    title: <IntlMessages id="sideNav.Players" />,
    messageId: "Players",
    type: "item",
    url: "/admin/players",
   
  },
  // {
  //   id: "Players Listing",
  //   title: "Players Listing",
  //   messageId: "Players Listing",
  //   type: "item",
  //   url: "/playersListing",
   
  // },
  {
    id: "battles",
    title:  <IntlMessages id="sideNav.Battles" />,
    messageId: "Battles",
    type: "item",
    url: "/admin/battles",
  },

  {
    id: "Collection",
    title:  <IntlMessages id="sideNav.Collection" />,
    messageId: "Collection",
    type: "item",
    url: "/admin/collections",
   
  },


 
];
export default routesConfig;
