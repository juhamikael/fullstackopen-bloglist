import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { cn } from "../lib/utils";
import { useLocation } from "react-router-dom";

import { AiFillGithub as GithubIcon } from "react-icons/ai";

const stack = [
  {
    frontend: [
      "React",
      "TailwindCSS",
      "Redux-Toolkit",
      "React Icons",
      "Shadcn/ui",
    ],
    backend: ["Node.js", "Express", "MongoDB", "Mongoose"],
    cloud: ["Vercel", "Cloudflare"],
  },
];

const FAQPage = () => {
  const location = useLocation();
  return (
    <div
      className={`flex justify-center ${
        location.pathname === "/faq" && "pt-10"
      }`}
    >
      <div
        className={
          location.pathname === "/faq" ? "px-10 lg:px-4 lg:w-1/3" : "w-full"
        }
      >
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What is this?</AccordionTrigger>
            <AccordionContent>
              Kind of a blog app. This is extended version of the{" "}
              <a
                className="text-primary font-bold"
                target="_blank"
                href="https://fullstackopen.com/en/part7/exercises_extending_the_bloglist"
              >
                Full Stack Open
              </a>{" "}
              bloglist app.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How this was extended?</AccordionTrigger>
            <AccordionContent>
              <div className={cn("flex flex-col gap-y-4")}>
                <p>
                  The original version had minimal styling with Pure CSS and did
                  not have redux.
                </p>
                <p>
                  Additionally I added a more features like redux for state
                  managment, comments, password validation, account deletion,
                  comparing password to a haveibeenpwned database, and more.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What technologies are used on this?
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col">
                {stack.map((item) => (
                  <div key={item}>
                    <div className="flex justify-around">
                      <div>
                        <p className="font-bold">Frontend</p>
                        <ul className="list-disc list-inside">
                          {item.frontend.map((tech) => (
                            <li key={tech}>{tech}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold">Backend</p>
                        <ul className="list-disc list-inside">
                          {item.backend.map((tech) => (
                            <li key={tech}>{tech}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold">Cloud</p>
                        <ul className="list-disc list-inside">
                          {item.cloud.map((tech) => (
                            <li key={tech}>{tech}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-around my-2">
                  <a
                    target="_blank"
                    href="https://github.com/juhamikael/fullstackopen/tree/main/part7"
                    className="pt-2 text-green-300 hover:text-primary/80 flex items-center gap-x-2 text-lg "
                  >
                    <GithubIcon />
                    Frontend
                  </a>
                  <a
                    target="_blank"
                    href="https://github.com/juhamikael/fullstackopen/tree/main/part4"
                    className="pt-2 text-green-300 hover:text-primary/80 flex items-center gap-x-2 text-lg "
                  >
                    <GithubIcon />
                    Backend
                  </a>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              What about the security and what kind of data is stored?
            </AccordionTrigger>
            <AccordionContent>
              Only username, name and password are stored. Passwords are hashed.
              You can use any name and username you want so basically you can be
              anonymous.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQPage;
