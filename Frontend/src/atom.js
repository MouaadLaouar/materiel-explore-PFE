import { atom } from 'jotai'


export const initialNavigationAtom = atom([
    { name: "Home", href: "/", current: true },
    { name: "Materials", href: "/materials", current: false },
    { name: "About Us", href: "/aboutUs", current: false },
    { name: "Contact", href: "/contact", current: false },
]);

export const signInNavigationAtom = atom([
    { name: "Sign In", href: "/signIn", current: false },
]);

export const userIdAtom = atom(null);

export const CurrentPage = atom('Home')
