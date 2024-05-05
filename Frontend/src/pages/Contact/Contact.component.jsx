import { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Contact = () => {
  const form = useRef();

  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_miwgsin", "template_4uuq27x", form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("Email Sent Successfully !");
          e.target.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Something Went Wrong !");
          e.target.reset();
        }
      );
  };

  return (
    <div className="bg-gradient-to-b from-teal-900 to-teal-600 h-96 w-full">
      <div className="w-full flex items-center justify-center">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="absolute top-40 bg-white shadow rounded py-12 px-12 lg:w-4/6  md:w-9/12 sm:w-11/12 w-full"
        >
          <h1 className=" text-5xl tracking-wide mt-5 mb-8 font-bold text-center text-black font-outfit">
            Contact
          </h1>
          <p className=" text-xl font-medium font-mdMed text-center text-gray-700">
            Your Feedback is important to us
          </p>
          <div className=" items-center mt-12">
            <div className=" flex flex-col">
              <label className="text-base font-semibold leading-none text-gray-800">
                Your Name
              </label>
              <input
                name="from_name"
                type="text"
                className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-400"
                placeholder="Enter Your Name Here"
              />
            </div>
            <div className=" flex flex-col mt-8">
              <label className="text-base font-semibold leading-none text-gray-800">
                Your Email Address
              </label>
              <input
                name="reply_to"
                type="text"
                placeholder="Enter Your Email Here"
                className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-400"
              />
            </div>
          </div>
          <div>
            <div className="w-full flex flex-col mt-8">
              <label className="text-base font-semibold leading-none text-gray-800">
                Your Message
              </label>
              <textarea
                name="message"
                aria-label="leave a message"
                role="textbox"
                placeholder="Enter Your Message Here"
                type="text"
                className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-400 resize-none"
                defaultValue={""}
              />
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            <button className="mt-9 text-base font-semibold leading-none text-white py-4 px-10 bg-teal-700 rounded hover:bg-teal-600 focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 focus:outline-none">
              Send Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
