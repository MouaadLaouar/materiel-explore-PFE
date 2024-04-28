import notFound from "../../assets/notFound.svg";

export default function NotFound() {

  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:pb-48 sm:pt-4  lg:px-8">
        <div className="text-center">
          <img src={notFound} alt="" className="h-60 w-60 m-auto" />
          <p className="text-base font-semibold text-teal-700">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              className="rounded-md bg-teal-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              href="/"
            >
              Go back home
            </a>
            <a
              href="/contact"
              className="rounded-md  px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-teal-700  hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
