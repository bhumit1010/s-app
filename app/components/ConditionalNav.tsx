"use client";

import { usePathname } from "next/navigation";
import Nav from "./Nav";

// Routes where we don't want to show the navbar
const hideNavRoutes = ["/login", "/profile-setup"];

const ConditionalNav = () => {
    const pathname = usePathname();
    const shouldHideNav = hideNavRoutes.some(route => pathname?.startsWith(route));

    if (shouldHideNav) {
        return null;
    }

    return <Nav />;
};

export default ConditionalNav;
