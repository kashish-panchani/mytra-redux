import React from "react";

const Model = () => {
  return (
    <div className="max-w-md border bg-slate-200">
      <div className="text-center text-sm">
        <div>
          <span>Hello! Let's start creating your product catalog.</span>
        </div>
        <div>
          <span> Enter some guidelines for your descriptions.</span>
        </div>
      </div>

      <div className="flex justify-center items-center p-2">
        <textarea
          className="w-96 italic abc"
          placeholder="For example: Describe the print  and material in detail."
        ></textarea>
      </div>
      <div className="text-center text-sm">
        <div>
          <span>
            Do you want to include any information in all the descriptions,
          </span>
        </div>
        <div>
          <span>"For example, Our products are animal cruelty free."</span>
        </div>
        <div>
          <span>We picked up some text from your brand profile.</span>
        </div>

        <div>
          <span>Edit as needed.</span>
        </div>
      </div>
      <div className="flex justify-center items-center p-3">
        <textarea
          className="w-96 italic"
          alt="brand profile"
          placeholder="(Autofill the brand profile text)"
        ></textarea>
      </div>
    </div>
  );
};

export default Model;
