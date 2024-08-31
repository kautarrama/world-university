import React from "react";
import Ava from "./ava.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <header className="bg-green-700 text-white py-8 w-full shadow-md">
        <h1 className="text-5xl text-center font-bold">About WorldUniversity</h1>
      </header>
      <main className="flex-grow w-full max-w-5xl px-8 py-16">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-700 mb-6">Welcome to WorldUniversity</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            WorldUniversity is a platform dedicated to helping you discover universities from all around the globe. Whether {`you're`} looking for specific details about institutions or exploring new regions, {`we've`} got you covered. Our goal is to make higher education accessible to everyone.
          </p>
          <img 
            src="https://thumbs.dreamstime.com/b/world-map-country-name-21069248.jpg" 
            alt="WorldUniversity Illustration" 
            className="mx-auto mt-8 mb-12 rounded-lg shadow-lg"
          />
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Our Vision</h2>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            To connect students around the world with the best universities, promoting equal access to education and fostering academic excellence across borders.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Our mission is to create an inclusive platform where users can easily find information about universities worldwide. We aim to simplify the search process, offer detailed insights, and make education more accessible globally.
          </p>
        </section>

        <section className="text-center flex flex-col gap-10 mb-12">
          <div>
            <a 
              href="/search" 
              className="px-8 py-4 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-800 transition duration-300 text-xl"
            >
              {`Let's Explore`}
            </a>
          </div>

          Or

          <div>
            <a 
              href="/" 
              className="px-8 py-4 bg-green-700 text-white rounded-full shadow-lg hover:bg-green-800 transition duration-300 text-xl"
            >
              Back to root!
            </a>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Developed By</h2>
          <div className="p-6 mx-auto w-96 rounded-lg text-center">
            <a 
              href="https://github.com/kautarrama" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <img 
                src={Ava} 
                alt="Khautal Hilmi Ramadhan - avatar" 
                className="w-32 h-32 mx-auto rounded-full mb-4 shadow-md"
              />
              <h3 className="text-2xl font-semibold text-green-700">Khautal Hilmi Ramadhan</h3>
              <p className="text-lg text-gray-600">Front End Developer</p>
              <div className="flex justify-center gap-4 mt-4">
                <a 
                  href="https://github.com/kautarrama" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-700 hover:text-gray-900"
                >
                  <i className="fab fa-github fa-2x"></i>
                </a>
                <a 
                  href="https://www.instagram.com/kautarama/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-700 hover:text-gray-900"
                >
                  <i className="fab fa-instagram fa-2x"></i>
                </a>
              </div>
            </a>
          </div>
        </section>
      </main>
      <footer className="bg-green-700 text-white p-4 w-full text-center">
        <p>© 2024 WorldUniversity. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
