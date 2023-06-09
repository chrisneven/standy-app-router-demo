import { Requester, getSdk } from "@/generated/graphql";

const requester: Requester = (doc, variables) =>
    fetch(
        "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cliotz5nm0i0i01ulevu1dvgw/master",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: doc.loc?.source.body, variables }),
        }
    )
        .then((res) => res.json())
        .then((res) => res.data);

const cms = getSdk(requester);

export default cms;
