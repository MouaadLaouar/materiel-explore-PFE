import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/Logo.png";
import user from "../../assets/user.svg";
import fetchUserDataIfLoggedIn from "../../Utils/fetchUserDataIfLoggedIn";
import SignOut from "../../Utils/signOut";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { initialNavigationAtom, signInNavigationAtom } from "../../atom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [navigation, setNavigation] = useAtom(initialNavigationAtom);
  const [signIn, setSignIn] = useAtom(signInNavigationAtom);

  const handleItemClick = (name) => {
    if (name === "Sign In") {
      setSignIn([{ ...signIn[0], current: true }]);
      setNavigation(
        navigation.map((item) => ({
          ...item,
          current: false,
        }))
      );
      navigate(signIn[0].href);
    } else {
      setNavigation(
        navigation.map((item) => ({
          ...item,
          current: item.name === name,
        }))
      );
      setSignIn([{ ...signIn[0], current: false }]);
    }
    localStorage.setItem("activeNavItem", name);
  };

  const checkUser = async () => {
    const ID = localStorage.getItem("userID");
    if (ID) {
      try {
        const data = await fetchUserDataIfLoggedIn(ID);
        setIsLoggedIn(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setActiveNavItem = () => {
    const activeItem = localStorage.getItem("activeNavItem");
    if (activeItem) {
      setNavigation(
        navigation.map((item) => ({
          ...item,
          current: item.name === activeItem,
        }))
      );
      setSignIn([{ ...signIn[0], current: "Sign In" === activeItem }]);
    }
  };

  useEffect(() => {
    setActiveNavItem();
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between align-middle">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
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
                    handleItemClick("Home");
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
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "bg-teal-700 text-white"
                            : "text-black hover:bg-teal-600 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                        onClick={() => {
                          handleItemClick(item.name);
                          navigate(item.href);
                          console.log(item.href);
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
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user}
                          alt=""
                        />
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
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
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
                    signIn[0].current
                      ? "bg-teal-700 text-white"
                      : "text-black hover:bg-teal-600 hover:text-white",
                    "rounded-md px-3 py-2 text-sm font-medium sm:ml-3 sm:relative absolute "
                  )}
                  onClick={() => {
                    handleItemClick(signIn[0].name);
                    navigate(signIn[0].href);
                  }}
                >
                  {signIn[0].name}
                </a>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-5 flex flex-col">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  className={classNames(
                    item.current
                      ? "bg-teal-700 text-white"
                      : "text-black hover:bg-teal-600 hover:text-white ",
                    "block rounded-md px-3 py-2 text-base font-medium "
                  )}
                  aria-current={item.current ? "page" : undefined}
                  onClick={() => {
                    handleItemClick(item.name);
                    navigate(item.href);
                  }}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
