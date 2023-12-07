import { Text } from "@radix-ui/themes";
const supported_features = [
  {
    id: 1,
    question: "What is Stark Voice?",
    answer:
      "Decentralized Voting Platform on Starknet. It supports Time-Bounded voting, Permissioned Voting, Token Weighted Voting",
  },
  {
    id: 2,
    question: "Time-Bounded Voting",
    answer:
      "Our platform introduces time-bound voting, adding an element of urgency and efficiency to the decision-making process. Users will have a designated timeframe to cast their votes, promoting swift and timely resolutions.",
  },
  {
    id: 3,
    question: "Permissioned Voting",
    answer:
      "Our platform implements permissioned voting. Only users with the required credentials (tokens) will be eligible to participate in specific votes, ensuring that only authorized individuals contribute to decision-making",
  },
  {
    id: 4,
    question: "Token Weighted Voting",
    answer:
      " The use of tokens as a voting mechanism adds a layer of fairness and representation. Users holding a certain number of tokens will be granted a corresponding number of votes. This token-per-vote system ensures that individuals with higher stakes have a proportional influence on the outcome.",
  },
  {
    id: 5,
    question: "User-Friendly Interface",
    answer:
      "Our user interface is designed to be intuitive and user-friendly, ensuring that even individuals unfamiliar with blockchain technology can easily navigate the platform. This accessibility encourages widespread participation in the decision-making process",
  },
];

const planned_features = [
  {
    id: 1,
    question: "User Hooks",
    answer:
      "Users can opt for email notifications for voting results when voting is over. User can also invite another user via email to vote on proposal.",
  },
  {
    id: 2,
    question: "Arbitrary Code Execution",
    answer:
      "Users can define a external internal contract to be called once voting ends. For example, sending funds to a dedicated party based on proposal output.",
  },
  {
    id: 3,
    question: "Support different-different gated models",
    answer: "User can add whitelist addresses for voting.",
  },
];

export const FAQ = () => {
  return (
    <div className="mt-8">
      <div className="mx-auto max-w-7xl divide-y divide-gray-200 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-3xl font-bold tracking-tight">
          Supported Features
        </h2>
        <div className="mb-2 mt-8">
          <dl className="divide-y divide-gray-200">
            {supported_features.map(({ question, answer, id }) => (
              <div
                className="pb-8 pt-6 md:grid md:grid-cols-12 md:gap-8"
                key={id}
              >
                <Text
                  className="text-base font-medium md:col-span-5"
                  color="crimson"
                >
                  {question}
                </Text>
                <dd className="mt-2 md:col-span-7 md:mt-0">
                  <Text className="text-base">{answer}</Text>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-4">
          <h2 className="my-8 block text-3xl font-bold tracking-tight">
            Upcoming Features 🚀
          </h2>
          <div className="mb-2 mt-8">
            <dl className="divide-y divide-gray-200">
              {planned_features.map(({ question, answer, id }) => (
                <div
                  className="pb-8 pt-6 md:grid md:grid-cols-12 md:gap-8"
                  key={id}
                >
                  <Text
                    className="text-base font-medium md:col-span-5"
                    color="crimson"
                  >
                    {question}
                  </Text>
                  <dd className="mt-2 md:col-span-7 md:mt-0">
                    <Text className="text-base">{answer}</Text>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};
