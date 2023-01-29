import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="pb-16 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="w-11/12 mx-auto pt-4 space-y-4">
        <h1 className="text-4xl pb-4 text-center font-semibold">
          Terms and Conditions
        </h1>
        <p>
          Welcome to our messaging website for the University of Florida
          community. By using our website, you agree to be bound by these terms
          and conditions. Please read them carefully. If you do not agree to
          these terms, you should not use this website.
        </p>
        <ol className="list-decimal space-y-4">
          <li>
            <h2>Use of the website</h2>
            <p>
              You agree to use this website only for lawful purposes, and in a
              manner that does not infringe the rights of, or restrict or
              inhibit the use and enjoyment of this website by any third party.
              This includes conduct which is unlawful or which may harass or
              cause distress or inconvenience to any person, the transmission of
              obscene or offensive content or disruption of normal flow of
              dialogue within this website.
            </p>
          </li>
          <li>
            <h2>User content</h2>
            <p>
              You are solely responsible for any content that you post or
              transmit on this website, including any forum or thread
              discussions. You agree not to post or transmit any content that is
              defamatory, offensive, or in violation of any laws or regulations.
              You also agree not to post or transmit any content that infringes
              the intellectual property rights of any third party. We reserve
              the right to remove any content that we deem to be in violation of
              these terms and conditions without notice.
            </p>
          </li>
          <li>
            <h2>Disclaimer of warranties</h2>
            <p>
              This website is provided on an "as is" and "as available" basis.
              We do not warrant that this website will be uninterrupted or
              error-free. We also do not make any representations or warranties
              about the accuracy, completeness, or suitability of the
              information provided on this website.
            </p>
          </li>
          <li>
            <h2>Limitation of liability</h2>
            <p>
              We shall not be liable for any damages whatsoever, including but
              not limited to any direct, indirect, special, consequential,
              punitive or incidental damages, or damages for loss of use,
              profits, data, or other intangibles, or the cost of procurement of
              substitute goods and services, arising out of or related to the
              use, inability to use, performance or failures of this website or
              the linked sites and any materials posted thereon, irrespective of
              whether such damages were foreseeable or arise in contract, tort,
              equity, restitution, by statute, at common law or otherwise.
            </p>
          </li>
          <li>
            <h2>Changes to terms and conditions</h2>
            <p>
              We reserve the right to change these terms and conditions at any
              time without notice. Your continued use of this website following
              any changes to these terms and conditions will be deemed to be
              your acceptance of those changes.
            </p>
          </li>
          <li>
            <h2>Governing law</h2>
            <p>
              These terms and conditions shall be governed by and construed in
              accordance with the laws of the State of Florida and any disputes
              will be decided only by the courts located in the State of
              Florida.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default TermsAndConditions;
