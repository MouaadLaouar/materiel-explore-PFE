import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/Logo.png";
import fetchUserDataIfLoggedIn from "../../Utils/Fetch/fetchUserDataIfLoggedIn";
import SignOut from "../../Utils/Authentification/signOut";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { userIdAtom } from "../../atom";

import { Pages } from "./NavBar.Helper";
import { useLocation } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useAtom(userIdAtom);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const checkUser = async () => {
    const ID = localStorage.getItem("userID");
    if (ID) {
      try {
        const data = await fetchUserDataIfLoggedIn(ID);
        setIsLoggedIn(data.ID);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8 [box-shadow:0_0_5px_rgba(117,_117,_117,_0.3)]">
            <div className="relative flex h-16 items-center justify-between align-middle">
              <div className="absolute  inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                <div
                  className="flex flex-shrink-0 items-center cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <img className="h-16 w-16" src={logo} alt="Your Company" />
                  <h1 className="hidden md:block text-lg font-bold ml-2 font-mdBold">
                    Material Explorer
                  </h1>
                </div>

                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  <div className="flex space-x-4">
                    {Pages.map((item) => (
                      <a
                        key={item.name}
                        className={classNames(
                          item.href === location.pathname
                            ? "bg-teal-700 text-white"
                            : "text-black hover:bg-teal-600 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer"
                        )}
                        aria-current={item.current ? "page" : undefined}
                        onClick={() => {
                          navigate(item.href);
                        }}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {isLoggedIn ? (
                <div className="absolute inset-y-0  sm:left-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3 ">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-300">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>

                        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-teal-600 rounded-full ">
                          <span className="font-medium text-white ">
                            {user.FirstName && user.LastName
                              ? `${user.FirstName[0].toUpperCase()}${user.LastName[0].toUpperCase()}`
                              : ""}
                          </span>
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute sm:right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer"
                              )}
                              onClick={() => {
                                navigate("Dashboard");
                              }}
                            >
                              Dashboard
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer"
                              )}
                              onClick={() => {
                                SignOut();
                                setIsLoggedIn(false);
                              }}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <a
                  className={classNames(
                    location.pathname === "/signIn"
                      ? "bg-teal-700 text-white"
                      : "text-black hover:bg-teal-600 hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium sm:ml-3 sm:relative absolute "
                  )}
                  onClick={() => {
                    navigate("/Signin");
                  }}
                >
                  Sign In
                </a>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden ">
            <div className="absolute z-40 bg-white min-w-full border-t-[1px] rounded-b-xl space-y-1 px-2 pb-3 pt-5 flex flex-col">
              {Pages.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  className={classNames(
                    item.href === location.pathname
                      ? "bg-teal-700 text-white"
                      : "text-black hover:bg-teal-600 hover:text-white ",
                    "block rounded-md px-3 py-2 text-base font-medium hover:cursor-pointer"
                  )}
                  aria-current={item.current ? "page" : undefined}
                  onClick={() => {
                    navigate(item.href);
                  }}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              {/* Semi-transparent overlay */}
            </div>
            {open && (
              <Disclosure.Button>
                <div className="fixed hover:cursor-default top-16 inset-0 z-30 bg-gray-900 bg-opacity-50 "></div>
              </Disclosure.Button>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
