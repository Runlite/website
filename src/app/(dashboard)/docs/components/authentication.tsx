import { TerminalCode } from "./termialCode";

export default function Authentication() {
  return (
    <>
      <p className="text-gray-700 leading-relaxed">
        To use our API, you will need to authenticate your requests. We use API
        keys for authentication.
      </p>
      <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
        Getting Your API Key
      </h3>
      <ol className="list-decimal list-inside text-gray-700 space-y-2">
        <li>Sign up for an account on our platform.</li>
        <li>Navigate to the API section in your dashboard.</li>
        <li>Generate a new API key.</li>
      </ol>
      <p className="text-gray-700 mt-4 mb-2">
        Include your API key in the headers of each request:
      </p>
      <TerminalCode code="Authorization: Bearer YOUR_API_KEY" language={'bash'} />
    </>
  );
}
