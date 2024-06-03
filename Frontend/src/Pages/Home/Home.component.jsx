import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-3 sm:px-6 sm:py-20 lg:px-8 overflow-hidden">
        <div className="relative flex justify-center items-center isolate overflow-hidden bg-teal-900 shadow-2xl rounded-3xl lg:flex lg:gap-x-20 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#FFF" />
                <stop offset={1} stopColor="#FFF" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-[90%] py-12 text-center lg:mx-0 lg:flex-auto lg:py-16">
            <h2 className="text-4xl font-kanit py-6 leading-8  tracking-normal text-white sm:text-6xl">
              Boost Your Researches
            </h2>
            <h2 className="text-2xl font-kanit leading-8  tracking-normal text-white sm:text-4xl">
              Dive In A World Full Of Materials
            </h2>
            <p className="mt-6 text-base sm:text-xl font-outfit leading-8 text-gray-300">
              The Official Labs Library Website Of University Badji Mokhtar
              Annaba
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 ">
              <Link
                to={"Materials"}
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:text-white hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </Link>
              <Link
                to={"AboutUs"}
                href="#"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          {/* <div className="relative w-full flex justify-end items-end sm:w-md mt-16  lg:mt-8">
            <img
              className="bg-white/5 max-w-sm ring-1 ring-white/10"
              src={img}
              alt="App screenshot"
              width={1824}
              height={1080}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
